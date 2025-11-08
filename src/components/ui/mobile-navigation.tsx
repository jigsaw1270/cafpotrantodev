'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface MobileNavigationProps {
  links: Array<{
    href: string;
    label: string;
  }>;
}

export function MobileNavigation({ links }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className="text-new-beige hover:bg-light-teal/20 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              {/* Menu Panel */}
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                  }}
                  className="bg-new-beige fixed top-0 right-0 z-[70] h-full w-[280px] shadow-2xl focus:outline-none"
                >
                  {/* Header */}
                  <div className="border-light-teal/20 flex h-16 items-center justify-between border-b px-5">
                    <Dialog.Title className="text-new-navy text-lg font-semibold">
                      Menu
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="text-new-navy hover:bg-light-teal/20 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
                        aria-label="Close menu"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Navigation Links */}
                  <nav
                    className="overflow-y-auto p-4"
                    style={{ height: 'calc(100% - 64px)' }}
                  >
                    <ul className="space-y-2">
                      {links.map((link, index) => {
                        const isActive = isActivePath(link.href);
                        return (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <a
                              href={link.href}
                              className={`group flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 ${
                                isActive
                                  ? 'bg-light-teal shadow-md'
                                  : 'hover:bg-light-teal/20'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <span
                                className={`text-lg font-medium ${
                                  isActive ? 'text-white' : 'text-new-navy'
                                }`}
                              >
                                {link.label}
                              </span>
                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${
                                  isActive ? 'text-white' : 'text-new-navy'
                                }`}
                              />
                            </a>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
