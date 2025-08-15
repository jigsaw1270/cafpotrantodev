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
    default: 'CafPotranto - Legal Services & Administrative Assistance',
    template: '%s | CafPotranto',
  },
  description:
    'Professional legal services for businesses and citizens to manage online procedures. Expert assistance with CAF and Patronato services, work benefits, pensions, and administrative procedures.',
  keywords: ['legal services', 'CAF services', 'Patronato', 'online procedures', 'work benefits', 'pensions', 'ISEE', 'NASpI', 'SPID'],
  authors: [{ name: 'CafPotranto Legal Services' }],
  creator: 'CafPotranto Legal Services',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.it'
  ),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.it',
    siteName: 'CafPotranto Legal Services',
    title: 'CafPotranto - Legal Services & Administrative Assistance',
    description:
      'Professional legal services for businesses and citizens to manage online procedures.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CafPotranto Legal Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cafpotranto',
    creator: '@cafpotranto',
    title: 'CafPotranto - Legal Services & Administrative Assistance',
    description:
      'Professional legal services for businesses and citizens to manage online procedures.',
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
