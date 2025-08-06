'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MobileNavigation } from '@/components/ui/mobile-navigation';
import { Button } from '@/components/ui/button';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="h-8 w-8 rounded-full bg-primary"
          />
          <span className="text-lg font-bold">CafPotranto</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation links={navigation} />
      </div>
    </motion.header>
  );
}
