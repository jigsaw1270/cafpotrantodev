'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
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
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <div className="text-2xl font-semibold text-foreground mb-2">
              Page Not Found
            </div>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Search suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 p-4 bg-secondary/30 rounded-lg"
          >
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Try checking the URL for typos or use the navigation menu to find
              what you're looking for.
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
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Or try one of these popular pages:
            </p>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-primary hover:text-primary/80"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="block text-sm text-primary hover:text-primary/80"
              >
                Our Services
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-primary hover:text-primary/80"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
