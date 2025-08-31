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
      <section className="bg-foreground z-30 border-b py-6">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 text-center">
              <h2 className="text-accent-foreground mb-2 text-2xl font-semibold lg:text-lg">
                Trova Servizi Legali
              </h2>
              <p className="text-accent-foreground text-sm">
                Cerca servizi legali specifici o assistenza amministrativa
              </p>
            </div>
            <Combobox
              placeholder="Search services (e.g., CAF, Patronato, ISEE)..."
              options={[
                { value: 'caf', label: 'Servizi CAF' },
                { value: 'patronato', label: 'Servizi Patronato' },
                { value: 'isee', label: 'Assistenza ISEE' },
                { value: 'naspi', label: 'Supporto NASpI' },
                { value: 'spid', label: 'Servizi SPID' },
                { value: 'pension', label: 'Pianificazione Pensione' },
                { value: 'benefits', label: 'Benefici Familiari' },
              ]}
              className="mx-auto max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="from-background to-secondary/20 relative hidden overflow-hidden bg-gradient-to-br py-24 lg:block">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Servizi Legali &
              <span className="text-primary"> Assistenza Amministrativa</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-8 text-xl"
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
              <CTAButton size="lg" className="text-lg">
                Our Services
              </CTAButton>
              <Button variant="outline" size="lg" className="text-lg">
                Free Consultation
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="bg-primary/5 absolute -top-40 -right-32 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-secondary/30 absolute -bottom-40 -left-32 h-80 w-80 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Le Nostre Categorie di Servizi
            </h2>
            <p className="text-muted-foreground mb-16 text-lg">
              Esplora la nostra gamma completa di servizi legali e assistenza
              amministrativa. Ogni categoria offre supporto specializzato su
              misura per le tue esigenze specifiche.
            </p>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Perché scegliere noi
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground mb-16 text-lg"
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
                className="bg-card text-accent-foreground rounded-lg border p-6 text-center shadow-sm"
              >
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <feature.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-accent-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Progettati per il Successo
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
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
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span className="text-foreground">{benefit}</span>
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
              <div className="from-primary/20 to-secondary/40 aspect-square rounded-lg bg-gradient-to-br" />
              <div className="bg-card absolute inset-4 rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Hai bisogno di assistenza legale?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Contattaci oggi per servizi legali professionali e supporto
              amministrativo. Il nostro team di esperti è pronto ad aiutarti a
              navigare le procedure complesse.
            </p>
            <CTAButton size="lg" className="text-lg">
              Prenota Consulenza
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
