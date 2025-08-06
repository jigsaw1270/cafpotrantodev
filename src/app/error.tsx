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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
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
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <div className="text-2xl font-semibold text-foreground mb-2">
              Something went wrong!
            </div>
            <p className="text-muted-foreground">
              We encountered an unexpected error. This has been reported to our
              team.
            </p>
          </motion.div>

          {/* Error details (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left"
            >
              <h3 className="text-sm font-semibold text-destructive mb-2">
                Error Details (Development)
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground font-mono mt-1">
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
              Try Again
            </Button>
            
            <Button variant="outline" asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </a>
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground">
              If this problem persists, please{' '}
              <a
                href="/contact"
                className="text-primary hover:text-primary/80 underline"
              >
                contact our support team
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
