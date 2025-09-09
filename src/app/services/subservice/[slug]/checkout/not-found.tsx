import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function CheckoutNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Servizio non trovato
          </h1>
          <p className="text-gray-600">
            Il servizio richiesto non esiste o non è disponibile per l'acquisto.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai servizi
          </Link>
          
          <div>
            <Link
              href="/"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Vai alla homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
