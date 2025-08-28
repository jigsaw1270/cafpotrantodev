'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error icon and message */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="mb-8"
          >
            <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive h-10 w-10" />
            </div>
            <div className="text-foreground mb-2 text-2xl font-semibold">
              Qualcosa è andato storto!
            </div>
            <p className="text-muted-foreground">
              Si è verificato un errore imprevisto. È stato segnalato al nostro
              team.
            </p>
          </motion.div>

          {/* Error details (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-destructive/5 border-destructive/20 mb-8 rounded-lg border p-4 text-left"
            >
              <h3 className="text-destructive mb-2 text-sm font-semibold">
                Dettagli Errore (Sviluppo)
              </h3>
              <p className="text-muted-foreground font-mono text-xs">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-muted-foreground mt-1 font-mono text-xs">
                  Digest: {error.digest}
                </p>
              )}
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <Button onClick={reset} size="lg" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Riprova
            </Button>

            <Button variant="outline" asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Vai alla Home
              </a>
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-border mt-8 border-t pt-8"
          >
            <p className="text-muted-foreground text-sm">
              Se questo problema persiste, per favore{' '}
              <a
                href="/contact"
                className="text-primary hover:text-primary/80 underline"
              >
                contatta il nostro team di supporto
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
