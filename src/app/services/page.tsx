import { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const revalidate = 300; // ISR: Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'I Nostri Servizi - CafPotranto Servizi Legali',
  description:
    'Servizi legali completi inclusi assistenza CAF, servizi Patronato, procedure amministrative e consulenza legale. Aiuto esperto per tutte le tue esigenze legali.',
  openGraph: {
    title: 'I Nostri Servizi - CafPotranto Servizi Legali',
    description:
      'Servizi legali completi inclusi assistenza CAF, servizi Patronato, procedure amministrative e consulenza legale.',
    type: 'website',
    url: '/services',
  },
};

export default function Services() {
  return <ServicesClient />;
}
