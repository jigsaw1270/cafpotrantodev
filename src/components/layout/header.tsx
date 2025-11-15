'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MobileNavigation } from '@/components/ui/mobile-navigation';
import { Combobox } from '@/components/ui/combobox';
import { useState, useEffect } from 'react';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Servizi' },
  { href: '/about', label: 'Chi Siamo' },
  { href: '/lavora-con-noi', label: 'Lavora con Noi' },
  // { href: '/consulting', label: 'Consulenze' },
  { href: '/contact', label: 'Contatti' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsAtTop(scrollTop < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isAtTop) {
    return null;
  }

  return (
    <div className="fixed top-0 z-40 w-full">
      <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-4">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="bg-new-navy shadow-elegant border-cyan/20 supports-[backdrop-filter]:bg-new-navy/80 rounded-2xl border backdrop-blur"
        >
          <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center space-x-2 lg:flex-1"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <img
                  src="/cafpatronatoaz.svg"
                  alt="CafPatronatoAZ Logo"
                  className="h-full w-full"
                />
              </motion.div>
              <span className="text-new-beige font-family-pathway-extreme hidden text-base font-bold uppercase sm:text-lg lg:inline">
                Caf-PatronatoAZ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="font-pathway-extreme-semibold text-md hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map(link => {
                const isActive = isActivePath(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative overflow-hidden rounded-lg px-3 py-2 transition-all duration-300 lg:px-4 ${
                      isActive
                        ? 'text-new-beige border-light-teal/40 from-light-teal/30 to-dark-teal/20 group border bg-gradient-to-r shadow-lg backdrop-blur-sm'
                        : 'text-new-beige hover:text-cyan hover:bg-cyan/10'
                    }`}
                  >
                    {/* Glossy overlay for active tab */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-60" />
                        <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                        <div className="bg-light-teal/20 absolute inset-0 -z-10 rounded-lg opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                      </>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden items-center gap-3 lg:flex lg:flex-1 lg:justify-end lg:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-64 lg:w-80"
                suppressHydrationWarning
              >
                <Combobox
                  placeholder="Cerca servizi..."
                  className="navbar-search"
                />
              </motion.div>
            </div>

            {/* Mobile & Tablet: Search & Menu */}
            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2 lg:hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[240px] md:flex-1"
                suppressHydrationWarning
              >
                <Combobox placeholder="Cerca..." className="mobile-search" />
              </motion.div>
              <MobileNavigation links={navigation} />
            </div>
          </div>
        </motion.header>
      </div>
    </div>
  );
}
