'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Form states
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

  const [urgency, setUrgency] = useState(false);
  const [premiumSupport, setPremiumSupport] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('credit-card');

  // Mock service data
  const serviceData = {
    name: 'Servizio Professionale',
    basePrice: 299.99,
    secretarialFees: 25.0,
    vatPercentage: 22,
  };

  const urgencyFee = 15.0;
  const premiumSupportFee = 10.0;

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = serviceData.basePrice + serviceData.secretarialFees;

    if (urgency) subtotal += urgencyFee;
    if (premiumSupport) subtotal += premiumSupportFee;

    // Apply coupon discount
    let discount = 0;
    if (appliedCoupon) {
      discount = subtotal * 0.1; // 10% discount for demo
    }

    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * (serviceData.vatPercentage / 100);
    const total = afterDiscount + vat;

    return {
      subtotal,
      discount,
      afterDiscount,
      vat,
      total,
    };
  };

  const { subtotal, discount, afterDiscount, vat, total } = calculateTotals();

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setAppliedCoupon({ code: couponCode, discount: 10 });
    } else {
      alert('Codice coupon non valido');
    }
  };

  const handlePaymentMethod = (method: string) => {
    // Save form data to localStorage or state management
    localStorage.setItem(
      'checkoutData',
      JSON.stringify({
        formData,
        urgency,
        premiumSupport,
        appliedCoupon,
        serviceData,
        totals: { subtotal, discount, afterDiscount, vat, total },
      })
    );

    // Navigate to specific payment method page
    router.push(`/services/subservice/${slug}/checkout/${method}`);
  };

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
              className="border-light-teal/30 rounded-3xl border bg-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-light-teal mb-8 flex items-center gap-3 text-2xl font-bold drop-shadow-lg">
                <User className="text-light-teal h-6 w-6" />I tuoi dati
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-new-navy mb-3 block text-sm font-medium">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                      handleFormChange('firstName', e.target.value)
                    }
                    className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 px-4 py-3 text-base backdrop-blur-md focus:ring-2"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label className="text-new-navy mb-3 block text-sm font-medium">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => handleFormChange('lastName', e.target.value)}
                    className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 px-4 py-3 text-base backdrop-blur-md focus:ring-2"
                    placeholder="Il tuo cognome"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-new-navy mb-3 block text-sm font-medium">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="text-light-teal absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleFormChange('email', e.target.value)}
                      className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 py-3 pr-4 pl-12 text-base backdrop-blur-md focus:ring-2"
                      placeholder="la-tua-email@esempio.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-new-navy mb-3 block text-sm font-medium">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleFormChange('phone', e.target.value)}
                    className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 px-4 py-3 text-base backdrop-blur-md focus:ring-2"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div>
                  <label className="text-new-navy mb-3 block text-sm font-medium">
                    CAP *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={e =>
                      handleFormChange('postalCode', e.target.value)
                    }
                    className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 px-4 py-3 text-base backdrop-blur-md focus:ring-2"
                    placeholder="12345"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-new-navy mb-3 block text-sm font-medium">
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
                      className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 py-3 pr-4 pl-12 text-base backdrop-blur-md focus:ring-2"
                      placeholder="Via, Numero civico"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-new-navy mb-3 block text-sm font-medium">
                    Città *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleFormChange('city', e.target.value)}
                    className="border-light-teal/30 text-new-navy focus:border-light-teal focus:ring-light-teal/50 w-full rounded-xl border bg-white/90 px-4 py-3 text-base backdrop-blur-md focus:ring-2"
                    placeholder="Nome della città"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Takes 1/3 of space on desktop */}
          <div className="space-y-3 lg:col-span-1">
            {/* Combined Add-ons Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border-light-teal/30 rounded-3xl border bg-white/20 p-6 shadow-2xl backdrop-blur-xl"
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
                      ? 'border-light-teal bg-light-teal/10'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-white/10'
                  }`}
                  onClick={() => setUrgency(!urgency)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-new-navy text-sm font-semibold">
                        Emergency €{urgencyFee.toFixed(2)}
                      </h3>
                      <p className="text-new-navy/70 text-xs">
                        The application will be processed as quickly as possible
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={urgency}
                      onChange={e => setUrgency(e.target.checked)}
                      className="border-light-teal/30 text-light-teal focus:ring-light-teal h-4 w-4 rounded"
                    />
                  </div>
                </div>

                {/* Premium Support Selector */}
                <div
                  className={`cursor-pointer rounded-xl border-2 p-4 backdrop-blur-md transition-all ${
                    premiumSupport
                      ? 'border-light-teal bg-light-teal/10'
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-white/10'
                  }`}
                  onClick={() => setPremiumSupport(!premiumSupport)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-new-navy text-sm font-semibold">
                        Premium Assistance €{premiumSupportFee.toFixed(2)}
                      </h3>
                      <p className="text-new-navy/70 text-xs">
                        Activate premium telephone support
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={premiumSupport}
                      onChange={e => setPremiumSupport(e.target.checked)}
                      className="border-light-teal/30 text-light-teal focus:ring-light-teal h-4 w-4 rounded"
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

            {/* Purchase Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border-light-teal/30 rounded-3xl border bg-white/20 p-6 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-light-teal mb-6 flex items-center gap-2 text-lg font-bold">
                <Receipt className="h-5 w-5" />
                Riepilogo Acquisto
              </h2>

              <div className="space-y-4">
                {/* Service Details */}
                <div className="border-light-teal/30 border-b pb-4">
                  <h3 className="text-new-navy mb-3 text-sm font-semibold">
                    {serviceData.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-new-navy/70">Prezzo base:</span>
                      <span className="text-new-navy font-medium">
                        €{serviceData.basePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-new-navy/70">
                        Oneri segreteria:
                      </span>
                      <span className="text-new-navy font-medium">
                        €{serviceData.secretarialFees.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                {(urgency || premiumSupport) && (
                  <div className="border-light-teal/30 border-b pb-4">
                    <h4 className="text-new-navy mb-3 text-sm font-medium">
                      Servizi aggiuntivi:
                    </h4>
                    <div className="space-y-2 text-sm">
                      {urgency && (
                        <div className="flex justify-between">
                          <span className="text-new-navy/70">Emergency:</span>
                          <span className="text-new-navy font-medium">
                            €{urgencyFee.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {premiumSupport && (
                        <div className="flex justify-between">
                          <span className="text-new-navy/70">
                            Premium Support:
                          </span>
                          <span className="text-new-navy font-medium">
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
                    <span className="text-new-navy/70">Subtotale:</span>
                    <span className="text-new-navy font-medium">
                      €{afterDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-new-navy/70">
                      IVA ({serviceData.vatPercentage}%):
                    </span>
                    <span className="text-new-navy font-medium">
                      €{vat.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-light-teal/30 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-new-navy text-lg font-bold">
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
                      <h4 className="text-new-navy text-sm font-medium">
                        Pagamento Sicuro
                      </h4>
                      <p className="text-new-navy/70 mt-1 text-xs">
                        I tuoi dati sono protetti con crittografia SSL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-light-teal/30 rounded-3xl border bg-white/20 p-6 shadow-2xl backdrop-blur-xl"
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
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-white/10'
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
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-white/10'
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
                      : 'border-light-teal/30 hover:border-light-teal/50 bg-white/10'
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
                  className="bg-light-teal hover:bg-light-teal/90 w-full rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                >
                  Continua con il Pagamento
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
