'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle, FileText, Shield, Users } from 'lucide-react';
import NeonButton from '@/components/ui/neon-button';
import CategoriesGrid from '@/components/services/CategoriesGrid';
import { SEO } from '@/components/seo';
import Pattern from '@/components/ui/pattern-background';

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
        title="CafPotranto - Servizi Legali e Assistenza Amministrativa"
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
        className="relative h-[calc(100vh-4rem)] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(/images/banner.webp), url(/images/hero-banner.jpg)',
        }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto flex h-full items-center px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-family-switzer mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              <span className="text-4xl font-bold text-white sm:text-6xl">
                CAF - PATRONATO SINDACATO <br />
              </span>
              Servizi Legali &<span className="text-yellow"> Assistenza </span>
              <span className="text-gradient-primary from-yellow to-cyan bg-gradient-to-r bg-clip-text text-transparent">
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
              className="font-family-switzer mb-8 text-xl leading-relaxed text-white opacity-90"
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
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <NeonButton onClick={handleServicesClick}>
                I nostri servizi
              </NeonButton>
              <NeonButton onClick={handleContactClick}>
                Consulenza gratuita
              </NeonButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="grad-up-navy py-12 lg:py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Le Nostre Categorie di Servizi
            </h2>
            <p className="mb-16 text-lg leading-relaxed text-slate-200">
              Esplora la nostra gamma completa di servizi legali e assistenza
              amministrativa. Ogni categoria offre supporto specializzato su
              misura per le tue esigenze specifiche.
            </p>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        {/* Pattern Background */}
        <div className="absolute inset-0 z-0">
          <Pattern />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hai bisogno di assistenza legale?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white">
              Contattaci oggi per servizi legali professionali e supporto
              amministrativo. Il nostro team di esperti è pronto ad aiutarti a
              navigare le procedure complesse.
            </p>
            <div className="flex justify-center">
              <NeonButton onClick={handleContactClick}>
                Prenota Consulenza
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grad-up-cyan py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Perché scegliere noi
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-cyan mb-16 text-lg leading-relaxed"
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
                className="border-navy-gradient-1/20 shadow-elegant hover-lift bg-purple rounded-lg border p-6 text-center"
              >
                <div className="from-cyan/20 to-navy-gradient-2/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br">
                  <feature.icon className="text-navy-gradient-2 h-8 w-8" />
                </div>
                <h3 className="text-navy-dark mb-2 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-navy-very-dark">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="via-cyan/5 bg-gradient-to-br from-white to-white py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-navy-dark mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Progettati per il Successo
              </h2>
              <p className="text-navy-very-dark mb-8 text-lg leading-relaxed">
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
                    <CheckCircle className="text-cyan h-5 w-5" />
                    <span className="text-navy-dark font-medium">
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
              className="relative"
            >
              <div className="from-cyan/20 via-navy-gradient-2/20 to-navy-gradient-1/20 aspect-square rounded-lg bg-gradient-to-br" />
              <div className="shadow-elegant-xl border-cyan/20 absolute inset-4 rounded-lg border bg-white" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
