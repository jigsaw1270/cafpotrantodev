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
    default: 'CafPotranto - Servizi Legali e Assistenza Amministrativa',
    template: '%s | CafPotranto',
  },
  description:
    'Servizi legali professionali per aziende e cittadini per gestire le procedure online. Assistenza specializzata con servizi CAF e Patronato, benefit lavorativi, pensioni e procedure amministrative.',
  keywords: [
    'servizi legali',
    'servizi CAF',
    'Patronato',
    'procedure online',
    'benefit lavorativi',
    'pensioni',
    'ISEE',
    'NASpI',
    'SPID',
  ],
  authors: [{ name: 'CafPotranto Servizi Legali' }],
  creator: 'CafPotranto Servizi Legali',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.it'
  ),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.it',
    siteName: 'CafPotranto Servizi Legali',
    title: 'CafPotranto - Servizi Legali e Assistenza Amministrativa',
    description:
      'Servizi legali professionali per aziende e cittadini per gestire le procedure online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CafPotranto Servizi Legali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cafpotranto',
    creator: '@cafpotranto',
    title: 'CafPotranto - Servizi Legali e Assistenza Amministrativa',
    description:
      'Servizi legali professionali per aziende e cittadini per gestire le procedure online.',
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
    <html lang="it" className="scroll-smooth">
      <head>
        {/* Language detection for Google Translate */}
        <meta httpEquiv="Content-Language" content="it" />
        {/* Google Translate Widget */}
        <script async src="/google-translate.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-screen font-sans antialiased`}
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
