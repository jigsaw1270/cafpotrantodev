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
      <div className="container mx-auto px-4 py-4">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="bg-new-navy shadow-elegant border-cyan/20 supports-[backdrop-filter]:bg-new-navy/80 rounded-2xl border backdrop-blur"
        >
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="h-8 w-8"
              >
                <img
                  src="/cafpatronatoaz.svg"
                  alt="CafPatronatoAZ Logo"
                  className="h-full w-full"
                />
              </motion.div>
              <span className="text-new-beige font-family-pathway-extreme hidden text-lg font-bold uppercase md:inline">
                Caf-PatronatoAZ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="font-pathway-extreme-semibold text-md hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
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
            <div className="hidden items-center gap-3 md:flex lg:gap-4">
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

            {/* Mobile: Search & Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
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
