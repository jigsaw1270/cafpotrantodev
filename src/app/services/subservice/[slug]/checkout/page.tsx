'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Building,
  Clock,
  Phone,
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
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/services/subservice/${slug}`}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al servizio
            </Link>
            <div className="text-muted-foreground text-sm">/ Checkout</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form Section */}
          <div className="space-y-8 lg:col-span-2">
            {/* Your Data Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background rounded-xl border p-6"
            >
              <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <User className="h-5 w-5" />I tuoi dati
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                      handleFormChange('firstName', e.target.value)
                    }
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => handleFormChange('lastName', e.target.value)}
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                    placeholder="Il tuo cognome"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleFormChange('email', e.target.value)}
                      className="border-input focus:ring-primary w-full rounded-lg border py-2 pr-3 pl-10 focus:border-transparent focus:ring-2"
                      placeholder="la-tua-email@esempio.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleFormChange('phone', e.target.value)}
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    CAP *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={e =>
                      handleFormChange('postalCode', e.target.value)
                    }
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                    placeholder="12345"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Indirizzo *
                  </label>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e =>
                        handleFormChange('address', e.target.value)
                      }
                      className="border-input focus:ring-primary w-full rounded-lg border py-2 pr-3 pl-10 focus:border-transparent focus:ring-2"
                      placeholder="Via, Numero civico"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Città *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleFormChange('city', e.target.value)}
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                    placeholder="Nome della città"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-background rounded-xl border p-6"
            >
              <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <CreditCard className="h-5 w-5" />
                Metodo di Pagamento
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => handlePaymentMethod('credit-card')}
                  className="border-input hover:border-primary group w-full rounded-lg border-2 p-4 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-primary h-6 w-6" />
                    <div>
                      <h3 className="text-foreground group-hover:text-primary font-semibold transition-colors">
                        Carta di Credito
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentMethod('paypal')}
                  className="border-input hover:border-primary group w-full rounded-lg border-2 p-4 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white">
                      P
                    </div>
                    <div>
                      <h3 className="text-foreground group-hover:text-primary font-semibold transition-colors">
                        PayPal
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Paga con il tuo account PayPal
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentMethod('bank-transfer')}
                  className="border-input hover:border-primary group w-full rounded-lg border-2 p-4 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Building className="text-primary h-6 w-6" />
                    <div>
                      <h3 className="text-foreground group-hover:text-primary font-semibold transition-colors">
                        Bonifico Bancario
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Trasferimento bancario diretto
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Purchase Summary Sidebar */}
          <div className="lg:col-span-1">
            {/* Urgency Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-xl border p-6"
            >
              <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <Clock className="h-5 w-5" />
                Urgenza
              </h2>

              <div className="space-y-4">
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    urgency
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setUrgency(!urgency)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground font-semibold">
                        Emergency €{urgencyFee.toFixed(2)}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        The application will be processed as quickly as possible
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={urgency}
                      onChange={e => setUrgency(e.target.checked)}
                      className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium Support Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background rounded-xl border p-6"
            >
              <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <Phone className="h-5 w-5" />
                Premium Telephone Support
              </h2>

              <div className="space-y-4">
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    premiumSupport
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => setPremiumSupport(!premiumSupport)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground font-semibold">
                        Premium Telephone Assistance €
                        {premiumSupportFee.toFixed(2)}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Allows you to activate premium telephone support
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={premiumSupport}
                      onChange={e => setPremiumSupport(e.target.checked)}
                      className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coupon Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-background rounded-xl border p-6"
            >
              <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <Tag className="h-5 w-5" />
                Codice Sconto
              </h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Inserisci codice sconto"
                  className="border-input focus:ring-primary flex-1 rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 transition-colors"
                >
                  Applica
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                  <p className="text-sm font-medium text-green-800">
                    ✓ Codice sconto "{appliedCoupon.code}" applicato! Risparmio
                    del {appliedCoupon.discount}%
                  </p>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background sticky top-6 rounded-xl border p-6"
            >
              <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <Receipt className="h-5 w-5" />
                Riepilogo Acquisto
              </h2>

              <div className="space-y-4">
                {/* Service Details */}
                <div className="border-b pb-4">
                  <h3 className="text-foreground mb-2 font-semibold">
                    {serviceData.name}
                  </h3>
                  <div className="space-y-2 text-sm">
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
                        Oneri di segreteria:
                      </span>
                      <span className="font-medium">
                        €{serviceData.secretarialFees.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                {(urgency || premiumSupport) && (
                  <div className="border-b pb-4">
                    <h4 className="text-foreground mb-2 font-medium">
                      Servizi aggiuntivi:
                    </h4>
                    <div className="space-y-2 text-sm">
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
                  <div className="border-b pb-4">
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

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground text-lg font-bold">
                      Totale:
                    </span>
                    <span className="text-primary text-lg font-bold">
                      €{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Pagamento Sicuro
                      </h4>
                      <p className="mt-1 text-xs text-blue-800">
                        I tuoi dati sono protetti con crittografia SSL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
