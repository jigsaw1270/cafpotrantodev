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
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="h-8 w-8"
          >
            <img 
              src="/cafpotranto.svg" 
              alt="CafPotranto Logo" 
              className="h-full w-full"
            />
          </motion.div>
          <span className="text-lg font-bold">CafPotranto</span>
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
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Accedi</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Inizia</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation links={navigation} />
      </div>
    </motion.header>
  );
}
