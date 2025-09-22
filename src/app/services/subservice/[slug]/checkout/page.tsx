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
    <div className="min-h-screen bg-cyan-500">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <Link
              href={`/services/subservice/${slug}`}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Torna al servizio
            </Link>
            <div className="text-muted-foreground text-xs">/ Checkout</div>
          </div>
        </div>
      </div>

      <div className="grad-up-cyan container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form Section - Takes 2/3 of space on desktop */}
          <div className="space-y-6 lg:col-span-2">
            {/* Your Data Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background rounded-xl border p-8"
            >
              <h2 className="text-foreground mb-8 flex items-center gap-3 text-2xl font-bold">
                <User className="h-6 w-6" />I tuoi dati
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                      handleFormChange('firstName', e.target.value)
                    }
                    className="border-input focus:ring-primary w-full rounded-lg border px-4 py-3 text-base focus:border-transparent focus:ring-2"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => handleFormChange('lastName', e.target.value)}
                    className="border-input focus:ring-primary w-full rounded-lg border px-4 py-3 text-base focus:border-transparent focus:ring-2"
                    placeholder="Il tuo cognome"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleFormChange('email', e.target.value)}
                      className="border-input focus:ring-primary w-full rounded-lg border py-3 pr-4 pl-12 text-base focus:border-transparent focus:ring-2"
                      placeholder="la-tua-email@esempio.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleFormChange('phone', e.target.value)}
                    className="border-input focus:ring-primary w-full rounded-lg border px-4 py-3 text-base focus:border-transparent focus:ring-2"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div>
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    CAP *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={e =>
                      handleFormChange('postalCode', e.target.value)
                    }
                    className="border-input focus:ring-primary w-full rounded-lg border px-4 py-3 text-base focus:border-transparent focus:ring-2"
                    placeholder="12345"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    Indirizzo *
                  </label>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e =>
                        handleFormChange('address', e.target.value)
                      }
                      className="border-input focus:ring-primary w-full rounded-lg border py-3 pr-4 pl-12 text-base focus:border-transparent focus:ring-2"
                      placeholder="Via, Numero civico"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground mb-3 block text-sm font-medium">
                    Città *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleFormChange('city', e.target.value)}
                    className="border-input focus:ring-primary w-full rounded-lg border px-4 py-3 text-base focus:border-transparent focus:ring-2"
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
              className="bg-background rounded-lg border p-3"
            >
              <h2 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold">
                <Clock className="h-3 w-3" />
                Servizi Aggiuntivi
              </h2>

              <div className="space-y-3">
                {/* Urgency Selector */}
                <div
                  className={`cursor-pointer rounded-md border-2 p-2 transition-all ${
                    urgency
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setUrgency(!urgency)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground text-xs font-semibold">
                        Emergency €{urgencyFee.toFixed(2)}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        The application will be processed as quickly as possible
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={urgency}
                      onChange={e => setUrgency(e.target.checked)}
                      className="text-primary focus:ring-primary h-3 w-3 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Premium Support Selector */}
                <div
                  className={`cursor-pointer rounded-md border-2 p-2 transition-all ${
                    premiumSupport
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setPremiumSupport(!premiumSupport)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground text-xs font-semibold">
                        Premium Assistance €{premiumSupportFee.toFixed(2)}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        Activate premium telephone support
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={premiumSupport}
                      onChange={e => setPremiumSupport(e.target.checked)}
                      className="text-primary focus:ring-primary h-3 w-3 rounded border-gray-300"
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
              className="bg-background rounded-lg border p-3"
            >
              <h2 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold">
                <Receipt className="h-3 w-3" />
                Riepilogo Acquisto
              </h2>

              <div className="space-y-2">
                {/* Service Details */}
                <div className="border-b pb-2">
                  <h3 className="text-foreground mb-1 text-xs font-semibold">
                    {serviceData.name}
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Prezzo base:
                      </span>
                      <span className="font-medium">
                        €{serviceData.basePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Oneri segreteria:
                      </span>
                      <span className="font-medium">
                        €{serviceData.secretarialFees.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                {(urgency || premiumSupport) && (
                  <div className="border-b pb-2">
                    <h4 className="text-foreground mb-1 text-xs font-medium">
                      Servizi aggiuntivi:
                    </h4>
                    <div className="space-y-1 text-xs">
                      {urgency && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Emergency:
                          </span>
                          <span className="font-medium">
                            €{urgencyFee.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {premiumSupport && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Premium Support:
                          </span>
                          <span className="font-medium">
                            €{premiumSupportFee.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Discount */}
                {discount > 0 && (
                  <div className="border-b pb-2">
                    <div className="flex justify-between text-xs">
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
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotale:</span>
                    <span className="font-medium">
                      €{afterDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      IVA ({serviceData.vatPercentage}%):
                    </span>
                    <span className="font-medium">€{vat.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground text-sm font-bold">
                      Totale:
                    </span>
                    <span className="text-primary text-sm font-bold">
                      €{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-2">
                  <div className="flex items-start gap-1">
                    <div className="mt-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-blue-900">
                        Pagamento Sicuro
                      </h4>
                      <p className="mt-0.5 text-xs text-blue-800">
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
              className="bg-background rounded-lg border p-3"
            >
              <h2 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold">
                <CreditCard className="h-3 w-3" />
                Metodo di Pagamento
              </h2>

              <div className="space-y-2">
                <div
                  className={`cursor-pointer rounded-md border-2 p-2 transition-all ${
                    selectedPaymentMethod === 'credit-card'
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPaymentMethod('credit-card')}
                >
                  <div className="flex items-center gap-2">
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
                        className={`h-3 w-3 rounded-full border-2 transition-colors ${
                          selectedPaymentMethod === 'credit-card'
                            ? 'border-primary bg-primary'
                            : 'border-input bg-transparent'
                        }`}
                      >
                        {selectedPaymentMethod === 'credit-card' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-1 w-1 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <CreditCard className="text-primary h-4 w-4" />
                    <div>
                      <h3
                        className={`text-xs font-semibold transition-colors ${
                          selectedPaymentMethod === 'credit-card'
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        Carta di Credito
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`cursor-pointer rounded-md border-2 p-2 transition-all ${
                    selectedPaymentMethod === 'paypal'
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPaymentMethod('paypal')}
                >
                  <div className="flex items-center gap-2">
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
                        className={`h-3 w-3 rounded-full border-2 transition-colors ${
                          selectedPaymentMethod === 'paypal'
                            ? 'border-primary bg-primary'
                            : 'border-input bg-transparent'
                        }`}
                      >
                        {selectedPaymentMethod === 'paypal' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-1 w-1 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex h-4 w-4 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white">
                      P
                    </div>
                    <div>
                      <h3
                        className={`text-xs font-semibold transition-colors ${
                          selectedPaymentMethod === 'paypal'
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        PayPal
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        Paga con il tuo account PayPal
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`cursor-pointer rounded-md border-2 p-2 transition-all ${
                    selectedPaymentMethod === 'bank-transfer'
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPaymentMethod('bank-transfer')}
                >
                  <div className="flex items-center gap-2">
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
                        className={`h-3 w-3 rounded-full border-2 transition-colors ${
                          selectedPaymentMethod === 'bank-transfer'
                            ? 'border-primary bg-primary'
                            : 'border-input bg-transparent'
                        }`}
                      >
                        {selectedPaymentMethod === 'bank-transfer' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-1 w-1 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Building className="text-primary h-4 w-4" />
                    <div>
                      <h3
                        className={`text-xs font-semibold transition-colors ${
                          selectedPaymentMethod === 'bank-transfer'
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        Bonifico Bancario
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        Trasferimento bancario diretto
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Button */}
              <div className="mt-3">
                <button
                  onClick={() => handlePaymentMethod(selectedPaymentMethod)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-3 py-2 text-sm font-semibold transition-colors"
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
