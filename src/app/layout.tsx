import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CafPotranto Dev - Modern Web Development',
    template: '%s | CafPotranto Dev',
  },
  description:
    'Professional web development services with modern technologies. Specializing in React, Next.js, and TypeScript applications.',
  keywords: ['web development', 'react', 'nextjs', 'typescript', 'frontend'],
  authors: [{ name: 'CafPotranto Dev' }],
  creator: 'CafPotranto Dev',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.dev'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.dev',
    siteName: 'CafPotranto Dev',
    title: 'CafPotranto Dev - Modern Web Development',
    description:
      'Professional web development services with modern technologies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CafPotranto Dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cafpotranto',
    creator: '@cafpotranto',
    title: 'CafPotranto Dev - Modern Web Development',
    description:
      'Professional web development services with modern technologies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
