'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MobileNavigation } from '@/components/ui/mobile-navigation';
import { Button } from '@/components/ui/button';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Chi Siamo' },
  { href: '/services', label: 'Servizi' },
  { href: '/consulting', label: 'Consulenze' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contatti' },
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
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
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
          <span className="text-navy-dark text-lg font-bold uppercase">
            Caf-Potranto
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map(link => {
            const isActive = isActivePath(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? 'from-navy-gradient-1 to-navy-gradient-2 shadow-elegant bg-gradient-to-r text-white'
                    : 'text-navy-dark hover:text-cyan hover:bg-cyan/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button
            variant="outline"
            asChild
            className="border-navy-gradient-1 text-navy-gradient-1 hover:bg-navy-gradient-1 hover-lift hover:text-white"
            style={{
              background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
              border: 'none',
              color: '#142850',
            }}
          >
            <Link href="/auth/login">Accedi</Link>
          </Button>
          <Button
            asChild
            className="from-cyan to-navy-gradient-2 hover:from-navy-gradient-2 hover:to-cyan shadow-elegant hover-lift bg-gradient-to-r"
          >
            <Link href="/auth/register">Inizia</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation links={navigation} />
      </div>
    </motion.header>
  );
}
