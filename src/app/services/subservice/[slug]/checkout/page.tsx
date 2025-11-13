'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Building,
  Clock,
  Tag,
  Receipt,
  User,
  Mail,
  MapPin,
  Upload,
  X,
  File,
  FileImage,
} from 'lucide-react';
import Link from 'next/link';
import { Subservice, Category } from '@/lib/types';
import apiClient from '@/lib/api';
import Loader from '@/components/ui/loader';
import ServicePromiseMarquee from '@/components/ui/ServicePromiseMarquee';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Data states
  const [subservice, setSubservice] = useState<Subservice | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formType, setFormType] = useState<'private' | 'agency'>('private');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Italy',
  });

  const [agencyFormData, setAgencyFormData] = useState({
    vatNumber: '',
    companyName: '',
    pecOrSdi: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });

  const [urgency, setUrgency] = useState(false);
  const [premiumSupport, setPremiumSupport] = useState(false);

  // Stable handlers to prevent translation interference
  const handleUrgencyChange = (checked: boolean) => {
    setUrgency(checked);
  };

  const handlePremiumSupportChange = (checked: boolean) => {
    setPremiumSupport(checked);
  };

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('credit-card');
  const [acceptDataProcessing, setAcceptDataProcessing] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Load subservice data
  useEffect(() => {
    const fetchSubserviceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch subservice by slug
        const subserviceResponse = await apiClient.getSubserviceBySlug(slug);

        if (!subserviceResponse.success || !subserviceResponse.data) {
          throw new Error('Failed to fetch subservice');
        }

        const foundSubservice = subserviceResponse.data.subservice;
        console.log('📦 Loaded subservice data:', {
          name: foundSubservice.name,
          price_start: foundSubservice.price_start,
          secretarialFees: foundSubservice.secretarialFees,
          vatPercentage: foundSubservice.vatPercentage,
        });
        setSubservice(foundSubservice);

        // Get the category details
        if (foundSubservice.categoryId) {
          const categoryResponse = await apiClient.getCategoryById(
            foundSubservice.categoryId
          );
          if (categoryResponse.success && categoryResponse.data) {
            setCategory(categoryResponse.data);
          }
        }
      } catch (err) {
        console.error('Error fetching subservice data:', err);

        // Temporary: Use mock data for testing when API fails
        const mockSubservice = {
          _id: 'mock-id',
          name: 'SPID con Video Riconoscimento',
          slug: 'spid-con-video-riconoscimento',
          price_start: 299.99,
          secretarialFees: 25.0,
          vatPercentage: 22,
          categoryId: 'mock-category-id',
          description: 'Servizio di test per checkout',
          shortDescription: 'Test',
          image: '',
          category: 'Identità Digitale',
        };

        setSubservice(mockSubservice as any);
        setError(null); // Clear error to allow testing
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSubserviceData();
    }
  }, [slug]);

  // Service data derived from subservice
  const serviceData = subservice
    ? {
        name: subservice.name,
        basePrice: subservice.price_start,
        secretarialFees: subservice.secretarialFees || 0,
        vatPercentage: subservice.vatPercentage || 22,
      }
    : {
        name: 'Loading...',
        basePrice: 0,
        secretarialFees: 0,
        vatPercentage: 22,
      };

  const urgencyFee = 15.0;
  const premiumSupportFee = 10.0;

  // Calculate totals with proper reactivity - recalculate whenever urgency/premium states change
  const { subtotal, discount, afterDiscount, vat, total } = useMemo(() => {
    // Don't calculate if subservice data is not loaded yet
    if (!subservice) {
      return {
        subtotal: 0,
        discount: 0,
        afterDiscount: 0,
        vat: 0,
        total: 0,
      };
    }

    // Use direct subservice properties to avoid stale closure issues
    const basePrice = Number(subservice.price_start) || 0;
    const secretarialFees = Number(subservice.secretarialFees) || 0;

    let subtotal = basePrice + secretarialFees;

    // Add additional services - these should update when state changes
    if (urgency) {
      subtotal += urgencyFee;
    }
    if (premiumSupport) {
      subtotal += premiumSupportFee;
    }

    // Apply coupon discount
    let discount = 0;
    if (appliedCoupon) {
      discount = subtotal * (appliedCoupon.discount / 100);
    }

    const afterDiscount = subtotal - discount;
    const vatRate = Number(subservice.vatPercentage) || 22;
    const vat = afterDiscount * (vatRate / 100);
    const total = afterDiscount + vat;

    return {
      subtotal,
      discount,
      afterDiscount,
      vat,
      total,
    };
  }, [subservice, urgency, premiumSupport, appliedCoupon]);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAgencyFormChange = (field: string, value: string) => {
    setAgencyFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormTypeChange = (type: 'private' | 'agency') => {
    setFormType(type);
    // Reset checkboxes when switching form types to ensure user re-confirms
    setAcceptDataProcessing(false);
    setAcceptTermsAndConditions(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type)) {
        alert(
          `File ${file.name} non è supportato. Solo PDF, JPG, PNG sono permessi.`
        );
        continue;
      }

      if (file.size > maxSize) {
        alert(`File ${file.name} è troppo grande. Massimo 10MB per file.`);
        continue;
      }

      validFiles.push(file);
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setAppliedCoupon({ code: couponCode, discount: 10 });
    } else {
      alert('Codice coupon non valido');
    }
  };

  const handlePaymentMethod = (method: string) => {
    // Validate required checkboxes
    if (!acceptDataProcessing || !acceptTermsAndConditions) {
      alert(
        'È necessario accettare il trattamento dei dati personali e le condizioni contrattuali per procedere.'
      );
      return;
    }

    // Validate form data based on form type
    const currentFormData = formType === 'private' ? formData : agencyFormData;
    const requiredFields =
      formType === 'private'
        ? [
            'firstName',
            'lastName',
            'email',
            'phone',
            'address',
            'city',
            'postalCode',
          ]
        : ['vatNumber', 'companyName', 'pecOrSdi', 'email', 'phone'];

    for (const field of requiredFields) {
      if (!currentFormData[field as keyof typeof currentFormData]) {
        alert(`Il campo ${field} è obbligatorio.`);
        return;
      }
    }

    // Prepare checkout data for localStorage (including files metadata)
    const checkoutData = {
      formType,
      formData: currentFormData,
      acceptDataProcessing,
      acceptTermsAndConditions,
      urgency,
      premiumSupport,
      appliedCoupon,
      serviceData,
      totals: { subtotal, discount, afterDiscount, vat, total },
      selectedPaymentMethod: method,
      uploadedFiles: uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      })), // Store file metadata for later email sending
    };

    // Save form data to localStorage
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // Convert files to base64 and store them separately for email attachments
    if (uploadedFiles.length > 0) {
      const filePromises = uploadedFiles.map(file => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              filename: file.name,
              content: reader.result?.toString().split(',')[1], // Remove data:type;base64, prefix
              contentType: file.type,
              size: file.size,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      // Wait for all files to be processed before navigating
      Promise.all(filePromises).then(base64Files => {
        localStorage.setItem('checkoutFiles', JSON.stringify(base64Files));
        // Navigate after files are stored
        router.push(
          `/services/subservice/${slug}/checkout/payment-confirmation?method=${method}&status=completed`
        );
      });
    } else {
      // No files to process, navigate immediately
      router.push(
        `/services/subservice/${slug}/checkout/payment-confirmation?method=${method}&status=completed`
      );
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-new-beige flex min-h-screen items-center justify-center">
        <Loader size="large" centered />
      </div>
    );
  }

  // Show error state
  if (error || !subservice) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            {error || 'Servizio non trovato'}
          </h1>
          <Link href="/services" className="text-blue-600 hover:text-blue-800">
            Torna ai servizi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-new-beige/95 relative min-h-screen overflow-hidden backdrop-blur-xl">
      {/* Glassmorphism Background Elements */}
      <div className="bg-light-teal/10 absolute top-20 left-20 h-40 w-40 rounded-full backdrop-blur-sm"></div>
      <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
      <div className="bg-light-teal/15 absolute top-1/3 right-1/4 h-24 w-24 rounded-full backdrop-blur-sm"></div>

      {/* Header */}
      <div className="border-light-teal/20 border-b backdrop-blur-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <Link
              href={`/services/subservice/${slug}`}
              className="text-new-navy/80 hover:text-new-navy flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Torna al servizio
            </Link>
            <div className="text-new-navy/60 text-xs">/ Checkout</div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form Section - Takes 2/3 of space on desktop */}
          <div className="space-y-6 lg:col-span-2">
            {/* Your Data Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-light-teal/30 rounded-3xl border bg-white/95 p-8 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-light-teal mb-8 flex items-center gap-3 text-2xl font-bold drop-shadow-lg">
                <User className="text-light-teal h-6 w-6" />I tuoi dati
              </h2>

              {/* Form Type Selection */}
              <div className="border-light-teal/30 bg-light-teal/5 mb-8 rounded-xl border p-4">
                <h3 className="mb-4 text-sm font-medium text-black">
                  Tipo di cliente
                </h3>
                <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="formType"
                      value="private"
                      checked={formType === 'private'}
                      onChange={e =>
                        handleFormTypeChange(
                          e.target.value as 'private' | 'agency'
                        )
                      }
                      className="text-light-teal border-light-teal/30 focus:ring-light-teal h-4 w-4"
                    />
                    <span className="text-sm font-medium text-black">
                      Privato
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="formType"
                      value="agency"
                      checked={formType === 'agency'}
                      onChange={e =>
                        handleFormTypeChange(
                          e.target.value as 'private' | 'agency'
                        )
                      }
                      className="text-light-teal border-light-teal/30 focus:ring-light-teal h-4 w-4"
                    />
                    <span className="text-sm font-medium text-black">
                      Azienda
                    </span>
                  </label>
                </div>
              </div>

              {/* Private Form */}
              {formType === 'private' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={e =>
                        handleFormChange('firstName', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="Il tuo nome"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Cognome *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={e =>
                        handleFormChange('lastName', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="Il tuo cognome"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="text-light-teal absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e =>
                          handleFormChange('email', e.target.value)
                        }
                        className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border py-3 pr-4 pl-12 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="la-tua-email@esempio.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => handleFormChange('phone', e.target.value)}
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      CAP *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={e =>
                        handleFormChange('postalCode', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="12345"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black">
                      Indirizzo *
                    </label>
                    <div className="relative">
                      <MapPin className="text-light-teal absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e =>
                          handleFormChange('address', e.target.value)
                        }
                        className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border py-3 pr-4 pl-12 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="Via, Numero civico"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Città *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => handleFormChange('city', e.target.value)}
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="Nome della città"
                    />
                  </div>

                  {/* Required Checkboxes */}
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptDataProcessingPrivate"
                        checked={acceptDataProcessing}
                        onChange={e =>
                          setAcceptDataProcessing(e.target.checked)
                        }
                        className="border-light-teal/30 text-light-teal focus:ring-light-teal mt-1 h-4 w-4 rounded focus:ring-2"
                        required
                      />
                      <label
                        htmlFor="acceptDataProcessingPrivate"
                        className="cursor-pointer text-sm text-black"
                      >
                        Accetto al trattamento dei miei dati personali. *
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptTermsPrivate"
                        checked={acceptTermsAndConditions}
                        onChange={e =>
                          setAcceptTermsAndConditions(e.target.checked)
                        }
                        className="border-light-teal/30 text-light-teal focus:ring-light-teal mt-1 h-4 w-4 rounded focus:ring-2"
                        required
                      />
                      <label
                        htmlFor="acceptTermsPrivate"
                        className="cursor-pointer text-sm text-black"
                      >
                        Accetto le condizioni contrattuali e le condizioni di
                        recesso. *
                      </label>
                    </div>

                    {/* File Upload Section */}
                    <div className="border-light-teal/20 border-t pt-6">
                      <label className="mb-3 block text-sm font-medium text-black">
                        📎 Allega Documenti (Opzionale)
                      </label>
                      <p className="mb-4 text-xs text-black/70">
                        Puoi allegare documenti PDF, JPG o PNG (max 10MB per
                        file)
                      </p>

                      <div className="space-y-4">
                        {/* File Input */}
                        <div className="relative">
                          <input
                            type="file"
                            id="fileUpload"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="fileUpload"
                            className="border-light-teal/30 bg-light-teal/5 hover:border-light-teal/50 hover:bg-light-teal/10 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-4 text-sm font-medium text-black transition-all"
                          >
                            <Upload className="h-5 w-5" />
                            Seleziona File
                          </label>
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-black">
                              File caricati ({uploadedFiles.length}):
                            </p>
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="border-light-teal/20 flex items-center justify-between rounded-lg border bg-white/50 p-3"
                              >
                                <div className="flex items-center gap-3">
                                  {file.type === 'application/pdf' ? (
                                    <File className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <FileImage className="h-4 w-4 text-blue-500" />
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-black">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-black/60">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="rounded-full p-1 text-red-500 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Agency Form */}
              {formType === 'agency' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Partita IVA *
                    </label>
                    <input
                      type="text"
                      value={agencyFormData.vatNumber}
                      onChange={e =>
                        handleAgencyFormChange('vatNumber', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="IT12345678901"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Ragione Sociale *
                    </label>
                    <input
                      type="text"
                      value={agencyFormData.companyName}
                      onChange={e =>
                        handleAgencyFormChange('companyName', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="Nome dell'azienda"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black">
                      PEC o Codice SDI *
                    </label>
                    <input
                      type="text"
                      value={agencyFormData.pecOrSdi}
                      onChange={e =>
                        handleAgencyFormChange('pecOrSdi', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="pec@esempio.it o ABCDEFG"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="text-light-teal absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                      <input
                        type="email"
                        value={agencyFormData.email}
                        onChange={e =>
                          handleAgencyFormChange('email', e.target.value)
                        }
                        className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border py-3 pr-4 pl-12 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="azienda@esempio.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      value={agencyFormData.phone}
                      onChange={e =>
                        handleAgencyFormChange('phone', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      CAP
                    </label>
                    <input
                      type="text"
                      value={agencyFormData.postalCode}
                      onChange={e =>
                        handleAgencyFormChange('postalCode', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="12345"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black">
                      Indirizzo
                    </label>
                    <div className="relative">
                      <MapPin className="text-light-teal absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                      <input
                        type="text"
                        value={agencyFormData.address}
                        onChange={e =>
                          handleAgencyFormChange('address', e.target.value)
                        }
                        className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border py-3 pr-4 pl-12 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="Via, Numero civico"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black">
                      Città
                    </label>
                    <input
                      type="text"
                      value={agencyFormData.city}
                      onChange={e =>
                        handleAgencyFormChange('city', e.target.value)
                      }
                      className="border-light-teal/30 bg-light-teal/5 focus:border-light-teal focus:ring-light-teal w-full rounded-xl border px-4 py-3 text-base text-black backdrop-blur-md transition-all focus:bg-white focus:ring-2 focus:outline-none"
                      placeholder="Nome della città"
                    />
                  </div>

                  {/* Required Checkboxes */}
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptDataProcessingAgency"
                        checked={acceptDataProcessing}
                        onChange={e =>
                          setAcceptDataProcessing(e.target.checked)
                        }
                        className="border-light-teal/30 text-light-teal focus:ring-light-teal mt-1 h-4 w-4 rounded focus:ring-2"
                        required
                      />
                      <label
                        htmlFor="acceptDataProcessingAgency"
                        className="cursor-pointer text-sm text-black"
                      >
                        Accetto al trattamento dei miei dati personali. *
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptTermsAgency"
                        checked={acceptTermsAndConditions}
                        onChange={e =>
                          setAcceptTermsAndConditions(e.target.checked)
                        }
                        className="border-light-teal/30 text-light-teal focus:ring-light-teal mt-1 h-4 w-4 rounded focus:ring-2"
                        required
                      />
                      <label
                        htmlFor="acceptTermsAgency"
                        className="cursor-pointer text-sm text-black"
                      >
                        Accetto le condizioni contrattuali e le condizioni di
                        recesso. *
                      </label>
                    </div>

                    {/* File Upload Section for Agency */}
                    <div className="border-light-teal/20 border-t pt-6">
                      <label className="mb-3 block text-sm font-medium text-black">
                        📎 Allega Documenti (Opzionale)
                      </label>
                      <p className="mb-4 text-xs text-black/70">
                        Puoi allegare documenti PDF, JPG o PNG (max 10MB per
                        file)
                      </p>

                      <div className="space-y-4">
                        {/* File Input */}
                        <div className="relative">
                          <input
                            type="file"
                            id="fileUploadAgency"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="fileUploadAgency"
                            className="border-light-teal/30 bg-light-teal/5 hover:border-light-teal/50 hover:bg-light-teal/10 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-4 text-sm font-medium text-black transition-all"
                          >
                            <Upload className="h-5 w-5" />
                            Seleziona File
                          </label>
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-black">
                              File caricati ({uploadedFiles.length}):
                            </p>
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="border-light-teal/20 flex items-center justify-between rounded-lg border bg-white/50 p-3"
                              >
                                <div className="flex items-center gap-3">
                                  {file.type === 'application/pdf' ? (
                                    <File className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <FileImage className="h-4 w-4 text-blue-500" />
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-black">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-black/60">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="rounded-full p-1 text-red-500 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Sidebar - Takes 1/3 of space on desktop */}
          <div className="space-y-3 lg:col-span-1">
            {/* Combined Add-ons Section */}
            <motion.div
              key={`addons-${urgency}-${premiumSupport}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border-light-teal/30 rounded-3xl border bg-white/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-light-teal mb-6 flex items-center gap-2 text-lg font-bold">
                <Clock className="h-5 w-5" />
                Servizi Aggiuntivi
              </h2>

              <div className="space-y-4">
                {/* Urgency Selector */}
                <div
                  className={`cursor-pointer rounded-xl border-2 p-4 backdrop-blur-md transition-all ${
                    urgency
                      ? 'border-light-teal bg-light-teal/20'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-light-teal/5'
                  }`}
                  onClick={() => handleUrgencyChange(!urgency)}
                  suppressHydrationWarning
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        <span>Emergenza</span> / <span>Emergency</span> €
                        {urgencyFee.toFixed(2)}
                      </h3>
                      <p className="text-xs text-black/70">
                        <span>
                          La pratica sarà elaborata il più velocemente possibile
                        </span>{' '}
                        /{' '}
                        <span>
                          The application will be processed as quickly as
                          possible
                        </span>
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={urgency}
                      onChange={e => {
                        e.stopPropagation();
                        handleUrgencyChange(e.target.checked);
                      }}
                      className="text-light-teal focus:ring-light-teal h-4 w-4 rounded border-white/30"
                    />
                  </div>
                </div>

                {/* Premium Support Selector */}
                <div
                  className={`cursor-pointer rounded-xl border-2 p-4 backdrop-blur-md transition-all ${
                    premiumSupport
                      ? 'border-light-teal bg-light-teal/20'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-light-teal/5'
                  }`}
                  onClick={() => handlePremiumSupportChange(!premiumSupport)}
                  suppressHydrationWarning
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        <span>Supporto Premium</span> /{' '}
                        <span>Premium Assistance</span> €
                        {premiumSupportFee.toFixed(2)}
                      </h3>
                      <p className="text-xs text-black/70">
                        <span>Attiva supporto telefonico premium</span> /{' '}
                        <span>Activate premium telephone support</span>
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={premiumSupport}
                      onChange={e => {
                        e.stopPropagation();
                        handlePremiumSupportChange(e.target.checked);
                      }}
                      className="text-light-teal focus:ring-light-teal h-4 w-4 rounded border-white/30"
                    />
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="hidden">
                  <h3 className="text-foreground mb-2 flex items-center gap-2 text-xs font-bold">
                    <Tag className="h-3 w-3" />
                    Codice Sconto
                  </h3>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="Inserisci codice"
                      className="border-input focus:ring-primary flex-1 rounded-md border px-2 py-1 text-xs focus:border-transparent focus:ring-1"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-2 py-1 text-xs transition-colors"
                    >
                      Applica
                    </button>
                  </div>

                  {appliedCoupon && (
                    <div className="mt-2 rounded-md border border-green-200 bg-green-50 p-2">
                      <p className="text-xs font-medium text-green-800">
                        ✓ Codice sconto "{appliedCoupon.code}" applicato!
                        Risparmio del {appliedCoupon.discount}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Purchase Summary - Only show when subservice data is loaded */}
            {subservice ? (
              <motion.div
                key={`summary-${urgency}-${premiumSupport}-${total}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="border-light-teal/30 rounded-3xl border bg-white/95 p-6 shadow-2xl backdrop-blur-xl"
              >
                <h2 className="text-light-teal mb-6 flex items-center gap-2 text-lg font-bold">
                  <Receipt className="h-5 w-5" />
                  Riepilogo Acquisto
                </h2>

                <div className="space-y-4">
                  {/* Service Details */}
                  <div className="border-light-teal/30 border-b pb-4">
                    <h3 className="mb-3 text-sm font-semibold text-black">
                      {subservice.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black/70">Prezzo base:</span>
                        <span className="font-medium text-black">
                          €{subservice.price_start.toFixed(2)}
                        </span>
                      </div>
                      {(subservice.secretarialFees || 0) > 0 && (
                        <div className="flex justify-between">
                          <span className="text-black/70">
                            Oneri segreteria:
                          </span>
                          <span className="font-medium text-black">
                            €{(subservice.secretarialFees || 0).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Services */}
                  {(urgency || premiumSupport) && (
                    <div className="border-light-teal/30 border-b pb-4">
                      <h4 className="mb-3 text-sm font-medium text-black">
                        Servizi aggiuntivi:
                      </h4>
                      <div className="space-y-2 text-sm">
                        {urgency && (
                          <div className="flex justify-between">
                            <span className="text-black/70">
                              <span>Emergenza</span> / <span>Emergency</span>:
                            </span>
                            <span className="font-medium text-black">
                              €{urgencyFee.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {premiumSupport && (
                          <div className="flex justify-between">
                            <span className="text-black/70">
                              <span>Supporto Premium</span> /{' '}
                              <span>Premium Support</span>:
                            </span>
                            <span className="font-medium text-black">
                              €{premiumSupportFee.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="border-light-teal/30 border-b pb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">
                          Sconto ({appliedCoupon?.discount}%):
                        </span>
                        <span className="font-medium text-green-600">
                          -€{discount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black/70">Subtotale:</span>
                      <span className="font-medium text-black">
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-black/70">Dopo sconto:</span>
                        <span className="font-medium text-black">
                          €{afterDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-black/70">
                        IVA ({serviceData.vatPercentage}%):
                      </span>
                      <span className="font-medium text-black">
                        €{vat.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-light-teal/30 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-black">
                        Totale:
                      </span>
                      <span className="text-light-teal text-lg font-bold">
                        €{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="border-light-teal/30 bg-light-teal/10 mt-4 rounded-xl border p-4 backdrop-blur-md">
                    <div className="flex items-start gap-3">
                      <div className="bg-light-teal mt-1 flex h-4 w-4 items-center justify-center rounded-full">
                        <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-black"></h4>
                        <p className="mt-1 text-xs text-black/70">
                          I tuoi dati sono protetti con crittografia SSL
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="border-light-teal/30 rounded-3xl border bg-white/95 p-6 shadow-2xl backdrop-blur-xl"
              >
                <h2 className="text-light-teal mb-6 flex items-center gap-2 text-lg font-bold">
                  <Receipt className="h-5 w-5" />
                  Riepilogo Acquisto
                </h2>
                <div className="space-y-4">
                  <div className="py-8 text-center">
                    <div className="animate-pulse">
                      <div className="mb-2 h-4 rounded bg-gray-200"></div>
                      <div className="mx-auto mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="mx-auto h-4 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-light-teal/30 rounded-3xl border bg-white/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-light-teal mb-6 flex items-center gap-3 text-xl font-bold drop-shadow-lg">
                <CreditCard className="text-light-teal h-6 w-6" />
                Metodo di Pagamento
              </h2>

              <div className="space-y-4">
                <div
                  className={`cursor-pointer rounded-2xl border-2 p-4 backdrop-blur-md transition-all ${
                    selectedPaymentMethod === 'credit-card'
                      ? 'border-light-teal bg-light-teal/20'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-light-teal/5'
                  }`}
                  onClick={() => setSelectedPaymentMethod('credit-card')}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={selectedPaymentMethod === 'credit-card'}
                        onChange={e => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`h-5 w-5 rounded-full border-2 transition-colors ${
                          selectedPaymentMethod === 'credit-card'
                            ? 'border-light-teal bg-light-teal'
                            : 'border-light-teal/50 bg-transparent'
                        }`}
                      >
                        {selectedPaymentMethod === 'credit-card' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <CreditCard className="text-light-teal h-6 w-6" />
                    <div>
                      <h3
                        className={`text-sm font-semibold transition-colors ${
                          selectedPaymentMethod === 'credit-card'
                            ? 'text-new-navy'
                            : 'text-new-navy/90'
                        }`}
                      >
                        Carta di Credito
                      </h3>
                      <p className="text-new-navy/70 text-xs">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`cursor-pointer rounded-2xl border-2 p-4 backdrop-blur-md transition-all ${
                    selectedPaymentMethod === 'paypal'
                      ? 'border-light-teal bg-light-teal/20'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-light-teal/5'
                  }`}
                  onClick={() => setSelectedPaymentMethod('paypal')}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={selectedPaymentMethod === 'paypal'}
                        onChange={e => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`h-5 w-5 rounded-full border-2 transition-colors ${
                          selectedPaymentMethod === 'paypal'
                            ? 'border-light-teal bg-light-teal'
                            : 'border-light-teal/50 bg-transparent'
                        }`}
                      >
                        {selectedPaymentMethod === 'paypal' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-sm font-bold text-white">
                      P
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-semibold transition-colors ${
                          selectedPaymentMethod === 'paypal'
                            ? 'text-new-navy'
                            : 'text-new-navy/90'
                        }`}
                      >
                        PayPal
                      </h3>
                      <p className="text-new-navy/70 text-xs">
                        Paga con il tuo account PayPal
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`cursor-pointer rounded-2xl border-2 p-4 backdrop-blur-md transition-all ${
                    selectedPaymentMethod === 'bank-transfer'
                      ? 'border-light-teal bg-light-teal/20'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-light-teal/5'
                  }`}
                  onClick={() => setSelectedPaymentMethod('bank-transfer')}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={selectedPaymentMethod === 'bank-transfer'}
                        onChange={e => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`h-5 w-5 rounded-full border-2 transition-colors ${
                          selectedPaymentMethod === 'bank-transfer'
                            ? 'border-light-teal bg-light-teal'
                            : 'border-light-teal/50 bg-transparent'
                        }`}
                      >
                        {selectedPaymentMethod === 'bank-transfer' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Building className="text-light-teal h-6 w-6" />
                    <div>
                      <h3
                        className={`text-sm font-semibold transition-colors ${
                          selectedPaymentMethod === 'bank-transfer'
                            ? 'text-new-navy'
                            : 'text-new-navy/90'
                        }`}
                      >
                        Bonifico Bancario
                      </h3>
                      <p className="text-new-navy/70 text-xs">
                        Trasferimento bancario diretto
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Button */}
              <div className="mt-6">
                <button
                  onClick={() => handlePaymentMethod(selectedPaymentMethod)}
                  disabled={!acceptDataProcessing || !acceptTermsAndConditions}
                  className={`w-full rounded-xl px-6 py-4 text-lg font-semibold shadow-lg backdrop-blur-md transition-all duration-300 ${
                    acceptDataProcessing && acceptTermsAndConditions
                      ? 'bg-light-teal hover:bg-light-teal/90 cursor-pointer text-white hover:scale-[1.02]'
                      : 'cursor-not-allowed bg-gray-400 text-gray-600 opacity-60'
                  }`}
                >
                  Continua con il Pagamento
                </button>
                {(!acceptDataProcessing || !acceptTermsAndConditions) && (
                  <p className="mt-2 text-center text-xs text-red-600">
                    Accetta i termini e le condizioni per procedere
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <ServicePromiseMarquee />
    </div>
  );
}
