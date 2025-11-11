import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ToastProvider } from '@/components/ui/toast';
import { GlobalToastListener } from '@/components/ui/global-toast-listener';
import { WhatsAppInitializer } from '@/components/whatsapp-initializer';
import { SWRProvider } from '@/components/providers/SWRProvider';
import { CookieConsent } from '@/components/ui/cookie-consent';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const roundex = localFont({
  src: [
    {
      path: '../../public/fonts/roundex/Roundex.otf',
      weight: '400',
      style: 'normal',
    },
    // Add more weights if you have them:
    // {
    //   path: '../../public/fonts/roundex/Roundex-Bold.otf',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-roundex',
  display: 'swap',
});

const pathwayExtreme = localFont({
  src: [
    {
      path: '../../public/fonts/pathway/PathwayExtreme-VariableFont_opsz,wdth,wght.ttf',
      weight: '100 900', // Variable font weight range
      style: 'normal',
    },
  ],
  variable: '--font-pathway-extreme',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CafPatronatoAZ - Servizi Legali e Assistenza Amministrativa',
    template: '%s | CafPatronatoAZ',
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
  authors: [{ name: 'CafPatronatoAZ Servizi Legali' }],
  creator: 'CafPatronatoAZ Servizi Legali',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpatronatoaz.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpatronatoaz.com',
    siteName: 'CafPatronatoAZ Servizi Legali',
    title: 'CafPatronatoAZ - Servizi Legali e Assistenza Amministrativa',
    description:
      'Servizi legali professionali per aziende e cittadini per gestire le procedure online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CafPatronatoAZ Servizi Legali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cafpatronatoaz',
    creator: '@cafpatronatoaz',
    title: 'CafPatronatoAZ - Servizi Legali e Assistenza Amministrativa',
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
    icon: [
      { url: '/cafpatronatoaz.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/cafpatronatoaz.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${roundex.variable} ${pathwayExtreme.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for faster loading */}

        {/* Language detection for Chrome's built-in translation */}
        <meta httpEquiv="Content-Language" content="it" />
        <meta name="language" content="it" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roundex.variable} ${pathwayExtreme.variable} bg-background min-h-screen font-sans antialiased`}
        suppressHydrationWarning
      >
        <SWRProvider>
          <ToastProvider>
            <GlobalToastListener />
            <WhatsAppInitializer />
            <CookieConsent />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="font-pathway-extreme-normal flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
