'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building,
  Copy,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

export default function BankTransferPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Mock bank details
  const bankDetails = {
    bankName: 'Banca Intesa Sanpaolo',
    accountHolder: 'CafPotranto S.r.l.',
    iban: 'IT60 X054 2811 1010 0000 0123 456',
    bic: 'BCITITMM',
    reference: `ORD-${Date.now()}`,
  };

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const confirmOrder = () => {
    setOrderConfirmed(true);
    // Here you would typically send the order to your backend

    setTimeout(() => {
      router.push(`/services/subservice/${slug}/checkout/success`);
    }, 2000);
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

  if (orderConfirmed) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="text-foreground mb-2 text-2xl font-bold">
            Ordine Confermato!
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
              / Bonifico Bancario
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Building className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold">
              Bonifico Bancario
            </h1>
            <p className="text-muted-foreground">
              Effettua il bonifico utilizzando i dati bancari qui sotto
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
                <span className="text-muted-foreground">
                  Totale da bonificare:
                </span>
                <span className="text-primary text-xl font-bold">
                  €{checkoutData?.totals?.total?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Codice ordine:</span>
                <span className="font-mono text-sm">
                  {bankDetails.reference}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bank Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background mb-8 rounded-xl border p-6"
          >
            <h2 className="text-foreground mb-6 text-lg font-semibold">
              Dati Bancari
            </h2>

            <div className="space-y-4">
              {/* Bank Name */}
              <div className="bg-secondary/30 flex items-center justify-between rounded-lg p-3">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    Banca
                  </label>
                  <p className="text-foreground font-medium">
                    {bankDetails.bankName}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.bankName, 'bank')}
                  className="hover:bg-secondary rounded-lg p-2 transition-colors"
                  title="Copia"
                >
                  {copied === 'bank' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="text-muted-foreground h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Account Holder */}
              <div className="bg-secondary/30 flex items-center justify-between rounded-lg p-3">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    Intestatario
                  </label>
                  <p className="text-foreground font-medium">
                    {bankDetails.accountHolder}
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(bankDetails.accountHolder, 'holder')
                  }
                  className="hover:bg-secondary rounded-lg p-2 transition-colors"
                  title="Copia"
                >
                  {copied === 'holder' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="text-muted-foreground h-4 w-4" />
                  )}
                </button>
              </div>

              {/* IBAN */}
              <div className="bg-secondary/30 flex items-center justify-between rounded-lg p-3">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    IBAN
                  </label>
                  <p className="text-foreground font-mono font-medium">
                    {bankDetails.iban}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                  className="hover:bg-secondary rounded-lg p-2 transition-colors"
                  title="Copia"
                >
                  {copied === 'iban' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="text-muted-foreground h-4 w-4" />
                  )}
                </button>
              </div>

              {/* BIC */}
              <div className="bg-secondary/30 flex items-center justify-between rounded-lg p-3">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    BIC/SWIFT
                  </label>
                  <p className="text-foreground font-mono font-medium">
                    {bankDetails.bic}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.bic, 'bic')}
                  className="hover:bg-secondary rounded-lg p-2 transition-colors"
                  title="Copia"
                >
                  {copied === 'bic' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="text-muted-foreground h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Amount */}
              <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border-2 p-3">
                <div>
                  <label className="text-primary text-sm font-medium">
                    Importo
                  </label>
                  <p className="text-primary text-lg font-bold">
                    €{checkoutData?.totals?.total?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      checkoutData?.totals?.total?.toFixed(2) || '0.00',
                      'amount'
                    )
                  }
                  className="hover:bg-primary/20 rounded-lg p-2 transition-colors"
                  title="Copia"
                >
                  {copied === 'amount' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="text-primary h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Reference */}
              <div className="flex items-center justify-between rounded-lg border-2 border-orange-200 bg-orange-50 p-3">
                <div>
                  <label className="text-sm font-medium text-orange-800">
                    Causale (OBBLIGATORIA)
                  </label>
                  <p className="font-mono font-medium text-orange-900">
                    {bankDetails.reference}
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(bankDetails.reference, 'reference')
                  }
                  className="rounded-lg p-2 transition-colors hover:bg-orange-200"
                  title="Copia"
                >
                  {copied === 'reference' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-orange-600" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Important Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-background mb-8 rounded-xl border p-6"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Istruzioni Importanti
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-xs font-bold text-orange-600">1</span>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Causale obbligatoria:
                  </strong>{' '}
                  Inserisci sempre il codice ordine{' '}
                  <code className="bg-secondary rounded px-2 py-1 font-mono">
                    {bankDetails.reference}
                  </code>{' '}
                  nella causale del bonifico
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-xs font-bold text-orange-600">2</span>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Importo esatto:</strong>{' '}
                  Trasferisci esattamente €
                  {checkoutData?.totals?.total?.toFixed(2) || '0.00'} per
                  evitare ritardi
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-xs font-bold text-orange-600">3</span>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Tempi di elaborazione:
                  </strong>{' '}
                  Il tuo ordine verrà elaborato entro 1-2 giorni lavorativi
                  dalla ricezione del bonifico
                </p>
              </div>
            </div>
          </motion.div>

          {/* Processing Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6"
          >
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-6 w-6 text-blue-600" />
              <div>
                <h3 className="mb-2 font-semibold text-blue-900">
                  Tempi di Elaborazione
                </h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>• Bonifici nazionali: 1 giorno lavorativo</p>
                  <p>• Bonifici SEPA: 1-2 giorni lavorativi</p>
                  <p>
                    • Attivazione servizio: entro 24 ore dalla conferma del
                    pagamento
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Confirm Order Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={confirmOrder}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-green-700"
            >
              <CheckCircle className="h-5 w-5" />
              Ho effettuato il bonifico - Conferma ordine
            </button>

            <p className="text-muted-foreground mt-3 text-center text-xs">
              Clicca solo dopo aver effettuato il bonifico. Riceverai una email
              di conferma.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
