'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
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
            <div className="text-primary mb-4 text-8xl font-bold">404</div>
            <div className="text-foreground mb-2 text-2xl font-semibold">
              Pagina Non Trovata
            </div>
            <p className="text-muted-foreground">
              La pagina che stai cercando non esiste o è stata spostata.
            </p>
          </motion.div>

          {/* Search suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-secondary/30 mb-8 rounded-lg p-4"
          >
            <Search className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              Prova a controllare l'URL per errori di battitura o usa il menu di
              navigazione per trovare quello che stai cercando.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <Button asChild size="lg" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Vai alla Home
              </Link>
            </Button>

            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna Indietro
            </Button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-border mt-8 border-t pt-8"
          >
            <p className="text-muted-foreground mb-4 text-sm">
              O prova una di queste pagine popolari:
            </p>
            <div className="space-y-2">
              <Link
                href="/about"
                className="text-primary hover:text-primary/80 block text-sm"
              >
                Chi Siamo
              </Link>
              <Link
                href="/services"
                className="text-primary hover:text-primary/80 block text-sm"
              >
                I Nostri Servizi
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 block text-sm"
              >
                Contattaci
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
