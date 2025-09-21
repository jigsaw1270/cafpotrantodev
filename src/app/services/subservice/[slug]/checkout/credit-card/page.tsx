'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function CreditCardPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  useEffect(() => {
    // Load checkout data from localStorage
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      setCheckoutData(JSON.parse(savedData));
    } else {
      // Redirect back if no data
      router.push(`/services/subservice/${slug}/checkout`);
    }
  }, [slug, router]);

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      if (formattedValue.length > 19) return; // Max length for formatted card number
    }

    if (field === 'expiryDate') {
      // Format expiry date MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    }

    if (field === 'cvv') {
      // Only numbers, max 4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardData(prev => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/services/subservice/${slug}/checkout/success`);
      }, 2000);
    }, 3000);
  };

  if (!checkoutData) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Caricamento dati...</p>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="text-foreground mb-2 text-2xl font-bold">
            Pagamento Completato!
          </h1>
          <p className="text-accent">Reindirizzamento in corso...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/services/subservice/${slug}/checkout`}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al checkout
            </Link>
            <div className="text-muted-foreground text-sm">
              / Pagamento con Carta di Credito
            </div>
          </div>
        </div>
      </div>

      <div className="grad-up-cyan container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Payment Method Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CreditCard className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold">
              Pagamento con Carta di Credito
            </h1>
            <p className="text-muted-foreground">
              Inserisci i dettagli della tua carta per completare il pagamento
            </p>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background mb-8 rounded-xl border p-6"
          >
            <h2 className="text-foreground mb-4 text-lg font-semibold">
              Riepilogo Ordine
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Totale da pagare:</span>
                <span className="text-primary text-xl font-bold">
                  €{checkoutData.totals.total.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background rounded-xl border p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Numero Carta *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.cardNumber}
                    onChange={e =>
                      handleCardInputChange('cardNumber', e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-3 font-mono text-lg focus:border-transparent focus:ring-2"
                    required
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                    <CreditCard className="text-muted-foreground h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Nome del Titolare *
                </label>
                <input
                  type="text"
                  value={cardData.cardholderName}
                  onChange={e =>
                    handleCardInputChange('cardholderName', e.target.value)
                  }
                  placeholder="Nome come appare sulla carta"
                  className="border-input focus:ring-primary w-full rounded-lg border px-3 py-3 focus:border-transparent focus:ring-2"
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Data di Scadenza *
                  </label>
                  <input
                    type="text"
                    value={cardData.expiryDate}
                    onChange={e =>
                      handleCardInputChange('expiryDate', e.target.value)
                    }
                    placeholder="MM/YY"
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-3 font-mono focus:border-transparent focus:ring-2"
                    required
                  />
                </div>

                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={e => handleCardInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="border-input focus:ring-primary w-full rounded-lg border px-3 py-3 font-mono focus:border-transparent focus:ring-2"
                    required
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">
                      Pagamento Sicuro
                    </h3>
                    <p className="mt-1 text-xs text-blue-800">
                      Tutte le transazioni sono crittografate con SSL. I tuoi
                      dati della carta non vengono memorizzati sui nostri
                      server.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <div className="border-primary-foreground h-5 w-5 animate-spin rounded-full border-b-2"></div>
                    Elaborazione in corso...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Paga €{checkoutData.totals.total.toFixed(2)}
                  </>
                )}
              </button>

              {/* Test Card Notice */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-900">
                      Modalità Test
                    </h3>
                    <p className="mt-1 text-xs text-yellow-800">
                      Questa è una demo. Utilizza il numero di carta 4242 4242
                      4242 4242 per testare il pagamento.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
