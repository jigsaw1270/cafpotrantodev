'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  FileText,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import GlossyButton from '@/components/ui/glossy-button';
import CategoriesGrid from '@/components/services/CategoriesGrid';
import { SEO } from '@/components/seo';
import OfficeCarousel from '@/components/ui/office-carousel';

const features = [
  {
    icon: FileText,
    title: 'Assistenza Amministrativa',
    description:
      'Aiuto specializzato con moduli, procedure e processi burocratici per cittadini e aziende.',
  },
  {
    icon: Shield,
    title: 'Conformità Legale',
    description:
      'Assicurati che le tue procedure siano conformi ai regolamenti e requisiti italiani.',
  },
  {
    icon: Users,
    title: 'Servizio Personalizzato',
    description:
      'Supporto dedicato su misura per le tue esigenze e circostanze specifiche.',
  },
];

const benefits = [
  'Servizi professionali CAF e Patronato',
  'Assistenza ISEE, NASpI e SPID',
  'Consulenze lavorative e pensionistiche',
  'Benefici familiari e supporto al reddito',
];

const officeLocations = [
  {
    name: 'MILANO SEDE LEGALE',
    address: 'Via LORENTEGGIO, 172 - MILANO 20147',
    phone: ['02.61460044', '349.5214147'],
    email: 'CAFLORENTEGGIO@GMAIL.COM',
    images: [
      '/images/office/office2 (1).jpg',
      '/images/office/office2 (2).jpg',
      '/images/office/office2 (3).jpg',
      '/images/office/office2 (4).jpg',
    ],
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Via+Lorenteggio+172+Milano+20147+Italy',
  },
  {
    name: 'MILANO VIA PADOVA',
    address: 'Via Padova, 288 - MILANO 20132',
    phone: ['02.36576660', '389.2691768'],
    email: 'CAFPADOVA288@GMAIL.COM',
    images: [
      '/images/office/office3 (1).jpg',
      '/images/office/office3 (2).jpg',
      '/images/office/office3 (3).jpg',
      '/images/office/office3 (4).jpg',
    ],
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Via+Padova+288+Milano+20132+Italy',
  },
  {
    name: 'MONZA',
    address: 'Via CARLO ALBERTO, 32 - MONZA 20900',
    phone: ['039.2304625', '351.9467782'],
    email: 'CAFMONZA@GMAIL.COM',
    images: [
      '/images/office/office1 (1).jpg',
      '/images/office/office1 (2).jpg',
      '/images/office/office1 (3).jpg',
      '/images/office/office1 (4).jpg',
    ],
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Via+Carlo+Alberto+32+Monza+20900+Italy',
  },
];

export default function Home() {
  const router = useRouter();

  const handleServicesClick = () => {
    router.push('/services');
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <>
      <SEO
        title="CafPatronatoAZ - Servizi Legali e Assistenza Amministrativa"
        description=" Offriamo servizi
legali professionali
rivolti ad aziende e
cittadini, con
particolare
competenza nellaF
gestione di procedure
online. Forniamo
assistenza
specializzata
nell’ambito dei servizi
CAF e Patronato,
inclusi benefici
lavorativi, pratiche
pensionistiche,
procedure per il
rilascio e il rinnovo
dei permessi di
soggiorno, nonché
altre pratiche
amministrative."
        url="/"
      />

      {/* Search section removed - now in navbar */}

      {/* Hero Section */}
      <section
        className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat pt-32 md:h-[calc(100vh-4rem)] md:pt-24"
        style={{
          backgroundImage:
            'url(/images/banner.webp), url(/images/hero-banner.jpg)',
        }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto flex h-full items-center px-8 py-12 md:py-0 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-family-general-sans mb-6 pt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              suppressHydrationWarning
            >
              <span className="font-family-roundex text-shadow-light-teal text-4xl font-extrabold text-white text-shadow-lg sm:text-8xl">
                CAF - PATRONATO SINDACATO <br />
              </span>
              <span className="tracking-wide sm:text-5xl">
                {' '}
                Servizi Legali &
              </span>
              <span className="text-yellow sm:text-5xl">
                {' '}
                <span className="sm:text-5xl"> Assistenza </span>
              </span>
              <span className="text-gradient-primary from-yellow to-cyan bg-gradient-to-r bg-clip-text text-transparent sm:text-5xl">
                {' '}
                Amministrativa
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-2xl font-semibold text-white"
            >
              ASSISTENZA FISCALE-SPORTELLO IMMIGRAZIONE-AGENZIA MULTISERVIZI
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-family-general-sans mb-8 text-xl leading-relaxed text-white opacity-90"
            >
              Offriamo servizi legali professionali rivolti ad aziende e
              cittadini, con particolare competenza nella gestione di procedure
              online. Forniamo assistenza specializzata nell'ambito dei servizi
              CAF e Patronato, inclusi benefici lavorativi, pratiche
              pensionistiche, procedure per il rilascio e il rinnovo dei
              permessi di soggiorno, nonché altre pratiche amministrative.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 flex flex-row items-center justify-center gap-3 sm:mb-0 sm:gap-4"
            >
              <GlossyButton onClick={handleServicesClick}>
                I nostri servizi
              </GlossyButton>
              <GlossyButton onClick={handleContactClick}>
                Consulenza gratuita
              </GlossyButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="bg-polka py-12 lg:py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-new-navy font-family-general-sans mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Le Nostre Categorie di Servizi
            </h2>
            <p className="text-new-light-navy mb-16 text-lg leading-relaxed">
              Esplora la nostra gamma completa di servizi legali e assistenza
              amministrativa. Ogni categoria offre supporto specializzato su
              misura per le tue esigenze specifiche.
            </p>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage: 'url(/images/bgimage1.webp)',
        }}
      >
        {/* Navy gradient overlay */}
        <div className="from-new-navy/90 via-new-navy/80 to-new-light-navy/70 absolute inset-0 bg-gradient-to-br"></div>

        <div className="relative z-10 container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-new-beige/20 bg-new-white/10 mx-auto max-w-2xl rounded-3xl border p-12 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="bg-light-teal/20 border-light-teal/30 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border">
              <Phone className="text-light-teal h-8 w-8" />
            </div>
            <h2 className="text-new-white font-family-general-sans mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Hai bisogno di assistenza legale?
            </h2>
            <p className="text-new-dim-cyan mb-8 text-lg leading-relaxed">
              Contattaci oggi per servizi legali professionali e supporto
              amministrativo. Il nostro team di esperti è pronto ad aiutarti a
              navigare le procedure complesse.
            </p>
            <div className="flex justify-center">
              <GlossyButton onClick={handleContactClick}>
                Prenota Consulenza
              </GlossyButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-new-white py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-new-navy font-family-general-sans mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Perché scegliere noi
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-new-light-navy mb-16 text-lg leading-relaxed"
            >
              Forniamo assistenza legale completa e supporto amministrativo per
              semplificare i tuoi processi burocratici.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border-light-teal/30 bg-light-teal/10 rounded-3xl border p-8 text-center shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02]"
              >
                <div className="bg-light-teal/20 border-light-teal/30 group-hover:border-light-teal mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all">
                  <feature.icon className="text-light-teal h-10 w-10" />
                </div>
                <h3 className="text-new-navy mb-3 text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-new-light-navy">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-new-navy py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border-new-beige/20 bg-new-white/10 rounded-3xl border p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="bg-light-teal/20 border-light-teal/30 mb-6 flex h-16 w-16 items-center justify-center rounded-full border">
                <Shield className="text-light-teal h-8 w-8" />
              </div>
              <h2 className="text-new-white font-family-general-sans mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Progettati per il Successo
              </h2>
              <p className="text-new-dim-cyan mb-8 text-lg leading-relaxed">
                Il nostro approccio di sviluppo garantisce che il tuo progetto
                venga consegnato in tempo, nel budget e superi le aspettative.
                Ci concentriamo su qualità, performance e scalabilità.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-light-teal h-6 w-6 flex-shrink-0" />
                    <span className="text-new-white font-medium">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border-new-beige/20 bg-new-white/10 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl"
            >
              <div className="aspect-square overflow-hidden rounded-3xl">
                <img
                  src="/images/successo.webp"
                  alt="Progettati per il Successo - Il nostro approccio professionale"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="bg-new-white py-24">
        <div className="container mx-auto px-8 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="text-new-navy font-family-general-sans mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Visita i Nostri Uffici per una Consulenza
            </h2>
            <p className="text-new-light-navy text-lg leading-relaxed">
              Siamo presenti in tre sedi strategiche per offrirti il miglior
              servizio possibile. Prenota un appuntamento e vieni a trovarci.
            </p>
          </motion.div>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-light-teal/30 bg-light-teal/10 h-full rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Image Carousel */}
                <div className="border-light-teal/20 mb-6 overflow-hidden rounded-2xl border shadow-xl">
                  <OfficeCarousel
                    images={office.images}
                    officeName={office.name}
                  />
                </div>

                {/* Office Info */}
                <div className="space-y-4">
                  <div className="border-light-teal/20 bg-light-teal/10 rounded-2xl border p-4 backdrop-blur-md">
                    <h3 className="text-new-navy mb-2 text-xl font-bold">
                      {office.name}
                    </h3>
                    <p className="text-new-light-navy text-sm font-medium">
                      {office.address}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {office.phone.map((phoneNumber, idx) => (
                      <a
                        key={idx}
                        href={`tel:+39${phoneNumber.replace(/\./g, '')}`}
                        className="group border-light-teal/30 bg-light-teal/10 hover:bg-light-teal/20 flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                      >
                        <div className="bg-light-teal rounded-full p-2">
                          <Phone className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-new-navy group-hover:text-light-teal font-medium transition-colors">
                          {phoneNumber}
                        </span>
                      </a>
                    ))}
                    <a
                      href={`mailto:${office.email}`}
                      className="group border-light-teal/30 bg-light-teal/10 hover:bg-light-teal/20 flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-new-navy group-hover:text-light-teal text-sm font-medium transition-colors">
                        {office.email}
                      </span>
                    </a>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={office.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <GlossyButton className="flex w-full items-center justify-center px-4 py-3 text-sm font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Ottieni Indicazioni</span>
                      </div>
                    </GlossyButton>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
