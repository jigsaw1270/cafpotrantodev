'use client';

import { motion } from 'framer-motion';
import { CheckCircle, FileText, Shield, Users } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import CategoriesGrid from '@/components/services/CategoriesGrid';
import { SEO } from '@/components/seo';

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
  return (
    <>
      <SEO
        title="CafPotranto - Servizi Legali e Assistenza Amministrativa"
        description="Servizi legali professionali per aziende e cittadini per gestire procedure online. Assistenza specializzata con servizi CAF e Patronato, benefici lavorativi, pensioni e procedure amministrative."
        url="/"
      />

      {/* Search/Filter Section */}
      <div className="bg-cyan max-auto text-cyan px-4 py-[2px]">.</div>
      <section className="bg-gradient-navy border-navy-gradient-1/30 z-30 border-b py-8">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 text-center">
              <h2 className="mb-3 text-2xl font-semibold text-white lg:text-3xl">
                Trova Servizi Legali
              </h2>
              <p className="text-cyan text-lg">
                Cerca servizi legali specifici o assistenza amministrativa
              </p>
            </div>
            <Combobox
              placeholder="Cerca servizi (es. CAF, Famiglie, Certificati, Lavoro)..."
              className="shadow-elegant-lg mx-auto max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="to-cyan/5 relative hidden overflow-hidden bg-gradient-to-br from-white via-white py-24 lg:block">
        <div className="from-cyan via-accent/90 absolute inset-0 bg-gradient-to-r to-transparent"></div>
        <div className="relative container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-navy-dark mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Servizi Legali &
              <span className="text-destructive"> Assistenza </span>
              <span className="text-gradient-primary from-destructive to-cyan bg-gradient-to-r bg-clip-text text-transparent">
                {' '}
                Amministrativa
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-navy-very-dark mb-8 text-xl leading-relaxed"
            >
              Servizi legali professionali per aziende e cittadini per gestire
              procedure online. Assistenza specializzata con servizi CAF e
              Patronato, benefici lavorativi, pensioni e procedure
              amministrative.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <CTAButton
                size="lg"
                className="shadow-elegant-lg hover-lift text-lg"
                style={{
                  background: 'linear-gradient(135deg, #00A8CC, #142850)',
                  border: 'none',
                  color: '#ffffff',
                }}
              >
                Our Services
              </CTAButton>
              <Button
                variant="outline"
                size="lg"
                className="border-navy-gradient-1 text-navy-gradient-1 hover:bg-navy-gradient-1 shadow-elegant text-lg hover:text-white"
                style={{
                  background: 'linear-gradient(135deg, #00A8CC, #142850)',
                  border: 'none',
                  color: '#ffffff',
                }}
              >
                Free Consultation
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="from-cyan/10 to-navy-gradient-2/5 absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />
          <div className="from-yellow/10 to-orange/5 absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />
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
                className="border-navy-gradient-1/20 shadow-elegant hover-lift rounded-lg border p-6 text-center"
                style={{
                  background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                  border: 'none',
                  color: '#142850',
                }}
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

      {/* CTA Section */}
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-8 lg:px-12">
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
            <p className="text-cyan mb-8 text-lg leading-relaxed">
              Contattaci oggi per servizi legali professionali e supporto
              amministrativo. Il nostro team di esperti è pronto ad aiutarti a
              navigare le procedure complesse.
            </p>
            <CTAButton
              size="lg"
              className="shadow-elegant-lg hover-lift text-lg"
              style={{
                background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                border: 'none',
                color: '#142850',
              }}
            >
              Prenota Consulenza
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
