import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        
        {/* Icon */}
        <div className="mb-6">
          <Search className="h-16 w-16 text-muted-foreground/40 mx-auto" />
        </div>
        
        {/* Content */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Categoria non trovata
        </h1>
        
        <p className="text-muted-foreground mb-8">
          La categoria che stai cercando non esiste o è stata rimossa.
        </p>
        
        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai servizi
          </Link>
          
          <div className="text-sm text-muted-foreground">
            Oppure{' '}
            <Link href="/" className="text-primary hover:underline">
              vai alla homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
