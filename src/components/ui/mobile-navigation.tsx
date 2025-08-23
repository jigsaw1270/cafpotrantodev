'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  links: Array<{
    href: string;
    label: string;
  }>;
}

export function MobileNavigation({ links }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
              onClick={toggleMenu}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
              }}
              className="fixed right-0 top-0 z-[70] h-full w-64 bg-card-foreground shadow-lg md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-4 bg-accent">
                <h2 className="text-2xl font-semibold text-foreground">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="px-4 bg-background rounded-2xl">
                <ul className="space-y-2 py-4">
                  {links.map((link, index) => {
                    const isActive = isActivePath(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={link.href}
                          className={`block rounded-md px-4 py-3 font-bold text-xl transition-colors ${
                            isActive
                              ? 'bg-foreground text-white'
                              : 'text-foreground bg-accent'
                          }`}
                          onClick={toggleMenu}
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
