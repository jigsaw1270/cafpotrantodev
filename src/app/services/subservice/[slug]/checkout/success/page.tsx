'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Load order data from localStorage
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      setOrderData(JSON.parse(savedData));
    }
  }, []);

  const mockOrderId = `ORD-${Date.now()}`;
  const estimatedCompletion = new Date();
  estimatedCompletion.setDate(estimatedCompletion.getDate() + 7);

  return (
    <div className="bg-background min-h-screen">
      <div className="grad-up-cyan container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="mb-8"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-foreground mb-4 text-3xl font-bold">
              Pagamento Completato!
            </h1>
            <p className="text-lg">
              Grazie per aver scelto i nostri servizi. Il tuo ordine è stato
              confermato.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card text-accent mb-8 rounded-xl border p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">Dettagli Ordine</h2>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div className="text-left">
                <label className="mb-1 block">Numero Ordine</label>
                <p className="font-mono font-medium">{mockOrderId}</p>
              </div>

              <div className="text-left">
                <label className="mb-1 block">Data Ordine</label>
                <p className="font-medium">
                  {new Date().toLocaleDateString('it-IT')}
                </p>
              </div>

              <div className="text-left">
                <label className="mb-1 block">Importo Pagato</label>
                <p className="font-bold text-green-600">
                  €{orderData?.totals?.total?.toFixed(2) || '0.00'}
                </p>
              </div>

              <div className="text-left">
                <label className="mb-1 block">Completamento Stimato</label>
                <p className="font-medium">
                  {estimatedCompletion.toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card text-accent mb-8 rounded-xl border p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">Prossimi Passi</h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Conferma via Email</h3>
                  <p className="text-sm">
                    Riceverai una email di conferma con tutti i dettagli
                    dell'ordine entro pochi minuti
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Elaborazione</h3>
                  <p className="text-sm">
                    Il nostro team inizierà a lavorare sul tuo progetto entro 24
                    ore
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Phone className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Contatto</h3>
                  <p className="text-sm">
                    Ti contatteremo per eventuali chiarimenti o aggiornamenti
                    sullo stato del lavoro
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors md:w-auto">
              <Download className="h-4 w-4" />
              Scarica Ricevuta
            </button>

            <div className="text-accent flex flex-col justify-center gap-4 md:flex-row">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna alla Home
              </Link>

              <Link
                href="/services"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                Esplora Altri Servizi
              </Link>
            </div>
          </motion.div>

          {/* Support Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-secondary/30 mt-12 rounded-xl p-6"
          >
            <h3 className="mb-2 font-semibold">Hai bisogno di aiuto?</h3>
            <p className="mb-4 text-sm">
              Il nostro team di supporto è qui per aiutarti
            </p>
            <div className="flex flex-col justify-center gap-2 text-sm md:flex-row">
              <a
                href="tel:+39123456789"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                📞 +39 123 456 789
              </a>
              <a
                href="mailto:support@cafpatronatoaz.com"
                className="text-cyan hover:text-cyan/80 transition-colors"
              >
                ✉️ support@cafpatronatoaz.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
