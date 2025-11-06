'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Download, FileText } from 'lucide-react';

interface CheckoutData {
  formType: 'private' | 'agency';
  formData: any;
  acceptDataProcessing: boolean;
  acceptTermsAndConditions: boolean;
  urgency: boolean;
  premiumSupport: boolean;
  appliedCoupon?: any;
  serviceData: any;
  totals: any;
  selectedPaymentMethod: string;
  uploadedFiles?: any[];
}

export default function PaymentConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Mock payment details from URL params
  const paymentMethod = searchParams.get('method') || 'credit-card';
  const paymentStatus = searchParams.get('status') || 'completed';

  const sendConfirmationEmail = useCallback(
    async (data: CheckoutData, orderIdToUse: string) => {
      setIsLoading(true);

      try {
        // Retrieve uploaded files from localStorage
        const storedFiles = localStorage.getItem('checkoutFiles');
        const attachments = storedFiles ? JSON.parse(storedFiles) : [];

        const emailData = {
          orderId: orderIdToUse,
          paymentMethod: paymentMethod,
          paymentStatus: paymentStatus,
          ...data,
          attachments: attachments,
        };

        const response = await fetch('/api/payment-confirmation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        const result = await response.json();

        if (response.ok) {
          setEmailSent(true);
          // Clear checkout data from localStorage after successful email
          localStorage.removeItem('checkoutData');
          localStorage.removeItem('checkoutFiles');
        } else {
          console.error('Email sending failed:', result.message);
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [paymentMethod, paymentStatus]
  );

  useEffect(() => {
    // Load checkout data from localStorage
    const storedData = localStorage.getItem('checkoutData');

    if (storedData) {
      const data = JSON.parse(storedData);
      setCheckoutData(data);

      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setOrderId(newOrderId);

      // Auto-send confirmation email after payment success
      if (paymentStatus === 'completed') {
        sendConfirmationEmail(data, newOrderId);
      }
    }
  }, [paymentStatus, paymentMethod, sendConfirmationEmail]);

  if (!checkoutData) {
    return (
      <div className="bg-new-beige/95 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-new-navy mb-4 text-2xl font-bold">
            Nessun dato di ordine trovato
          </h1>
          <button
            onClick={() => router.push('/')}
            className="bg-light-teal rounded-xl px-6 py-3 font-semibold text-white"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  const customerName =
    checkoutData.formType === 'private'
      ? `${checkoutData.formData.firstName} ${checkoutData.formData.lastName}`
      : checkoutData.formData.companyName;

  return (
    <div className="bg-new-beige/95 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Success Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>

            <h1 className="text-new-navy mb-4 text-4xl font-bold">
              🎉 Pagamento Confermato!
            </h1>

            <p className="text-new-navy/80 mb-2 text-xl">
              Grazie <strong>{customerName}</strong>!
            </p>

            <p className="text-new-navy/70 text-lg">
              Il tuo ordine è stato processato con successo.
            </p>
          </div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-light-teal/30 mb-8 rounded-3xl border bg-white/95 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid gap-8 md:grid-cols-2">
              {/* Order Info */}
              <div>
                <h3 className="text-new-navy mb-4 flex items-center gap-2 text-xl font-bold">
                  <FileText className="h-5 w-5" />
                  Dettagli Ordine
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-new-navy/70">ID Ordine:</span>
                    <span className="text-new-navy font-semibold">
                      {orderId}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-new-navy/70">Servizio:</span>
                    <span className="text-new-navy font-semibold">
                      {checkoutData.serviceData.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-new-navy/70">Metodo Pagamento:</span>
                    <span className="text-new-navy font-semibold capitalize">
                      {paymentMethod.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-new-navy/70">Status:</span>
                    <span className="font-semibold text-green-600">
                      ✅ {paymentStatus}
                    </span>
                  </div>

                  <div className="flex justify-between border-t pt-3 text-lg font-bold">
                    <span className="text-new-navy">Totale Pagato:</span>
                    <span className="text-green-600">
                      €{checkoutData.totals.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Status */}
              <div>
                <h3 className="text-new-navy mb-4 flex items-center gap-2 text-xl font-bold">
                  <Mail className="h-5 w-5" />
                  Conferma Email
                </h3>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center gap-3 text-blue-600">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-600"></div>
                      <span>Invio email di conferma...</span>
                    </div>
                  ) : emailSent ? (
                    <div className="text-green-600">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">
                          Email inviate con successo!
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          ✅ Conferma inviata a: {checkoutData.formData.email}
                        </p>
                        <p>✅ Notifica inviata al nostro team</p>
                        {checkoutData.uploadedFiles &&
                          checkoutData.uploadedFiles.length > 0 && (
                            <p>
                              📎 {checkoutData.uploadedFiles.length} file
                              allegati inclusi
                            </p>
                          )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-orange-600">
                      <span>⚠️ Email non ancora inviata</span>
                    </div>
                  )}

                  <div className="rounded-lg bg-blue-50 p-4 text-sm">
                    <h4 className="mb-2 font-semibold text-blue-900">
                      📧 Cosa riceverai:
                    </h4>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Conferma dell'ordine con dettagli completi</li>
                      <li>• Istruzioni sui prossimi passi</li>
                      <li>• Contatti per assistenza</li>
                      <li>• Copia di tutti i documenti allegati</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-light-teal/10 border-light-teal/30 mb-8 rounded-3xl border p-8"
          >
            <h3 className="text-new-navy mb-4 text-xl font-bold">
              📋 Prossimi Passi
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-light-teal flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="text-new-navy font-semibold">
                      Conferma Ricevuta
                    </h4>
                    <p className="text-new-navy/70 text-sm">
                      Controlla la tua email per la conferma dell'ordine
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-light-teal flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="text-new-navy font-semibold">
                      Elaborazione
                    </h4>
                    <p className="text-new-navy/70 text-sm">
                      Il nostro team inizierà a lavorare sul tuo servizio
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-light-teal flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <h4 className="text-new-navy font-semibold">
                      Aggiornamenti
                    </h4>
                    <p className="text-new-navy/70 text-sm">
                      Riceverai aggiornamenti via email sul progresso
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-light-teal flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    4
                  </div>
                  <div>
                    <h4 className="text-new-navy font-semibold">
                      Completamento
                    </h4>
                    <p className="text-new-navy/70 text-sm">
                      Riceverai il servizio completato secondo i tempi
                      concordati
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 text-center"
          >
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => window.print()}
                className="bg-new-navy hover:bg-new-navy/90 flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors"
              >
                <Download className="h-5 w-5" />
                Stampa Ricevuta
              </button>

              <button
                onClick={() => router.push('/')}
                className="bg-light-teal hover:bg-light-teal/90 rounded-xl px-6 py-3 font-semibold text-white transition-colors"
              >
                Torna alla Home
              </button>
            </div>

            <p className="text-new-navy/60 text-sm">
              Per assistenza, contatta: <strong>CAFMONZA12@GMAIL.COM</strong>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
