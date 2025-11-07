'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MobileNavigation } from '@/components/ui/mobile-navigation';
import { Combobox } from '@/components/ui/combobox';

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

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className="border-cyan/20 shadow-elegant sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
    >
      <div className="bg-new-navy container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="h-8 w-8"
          >
            <img
              src="/cafpotranto.svg"
              alt="CafPotranto Logo"
              className="h-full w-full"
            />
          </motion.div>
          <span className="text-new-beige hidden text-lg font-bold uppercase md:inline">
            Caf-Potranto
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="font-general-sans hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
          {navigation.map(link => {
            const isActive = isActivePath(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-md font-family-general-sans rounded-lg px-3 py-2 font-medium transition-all duration-200 lg:px-4 ${
                  isActive
                    ? 'from-navy-gradient-1 to-navy-gradient-2 shadow-elegant bg-gradient-to-r text-white'
                    : 'text-new-beige hover:text-cyan hover:bg-cyan/10'
                }`}
              >
                {link.label}
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
  );
}
