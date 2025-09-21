'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PayPalPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

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

  const handlePayPalPayment = () => {
    setProcessing(true);

    // Simulate PayPal redirect and processing
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
            Pagamento PayPal Completato!
          </h1>
          <p className="text-muted-foreground">Reindirizzamento in corso...</p>
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
              / Pagamento con PayPal
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
              <span className="text-2xl font-bold text-white">P</span>
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold">
              Pagamento con PayPal
            </h1>
            <p className="text-muted-foreground">
              Verrai reindirizzato a PayPal per completare il pagamento in modo
              sicuro
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
                  €{checkoutData?.totals?.total?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* PayPal Payment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background rounded-xl border p-6"
          >
            <div className="space-y-6 text-center">
              {/* PayPal Logo Area */}
              <div className="py-8">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500">
                  <span className="text-4xl font-bold text-white">PayPal</span>
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  Pagamento Sicuro con PayPal
                </h3>
                <p className="text-muted-foreground text-sm">
                  Accedi al tuo account PayPal o paga come ospite con carta di
                  credito
                </p>
              </div>

              {/* Payment Button */}
              {!processing ? (
                <button
                  onClick={handlePayPalPayment}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  <ExternalLink className="h-5 w-5" />
                  Continua con PayPal - €
                  {checkoutData?.totals?.total?.toFixed(2) || '0.00'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <p className="text-muted-foreground">
                    Reindirizzamento a PayPal in corso...
                  </p>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">
                      Se non vieni reindirizzato automaticamente, non chiudere
                      questa finestra.
                    </p>
                  </div>
                </div>
              )}

              {/* Security Features */}
              <div className="mt-8 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <h4 className="text-foreground font-medium">Sicuro</h4>
                  <p className="text-muted-foreground text-xs">
                    Crittografia SSL
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-xs font-bold text-blue-600">✓</span>
                  </div>
                  <h4 className="text-foreground font-medium">Protezione</h4>
                  <p className="text-muted-foreground text-xs">
                    Protezione acquirenti
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <span className="text-xs font-bold text-purple-600">!</span>
                  </div>
                  <h4 className="text-foreground font-medium">Veloce</h4>
                  <p className="text-muted-foreground text-xs">
                    Pagamento istantaneo
                  </p>
                </div>
              </div>

              {/* PayPal Benefits */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-left">
                <h4 className="mb-2 font-medium text-blue-900">
                  Vantaggi PayPal:
                </h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Non condividere i dati della carta</li>
                  <li>• Protezione acquirenti inclusa</li>
                  <li>• Pagamento in un click se hai già un account</li>
                  <li>• Possibilità di pagare anche senza account PayPal</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
