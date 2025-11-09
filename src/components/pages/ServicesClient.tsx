'use client';

import { motion } from 'framer-motion';
import CategoriesGrid from '@/components/services/CategoriesGrid';
import {
  ArrowRight,
  Target,
  Phone,
  Zap,
  CheckCircle2,
  Briefcase,
  FileText,
  Settings,
  Users,
  CheckCircle,
} from 'lucide-react';
import GlossyButton from '@/components/ui/glossy-button';

const process = [
  {
    step: '01',
    title: 'Consulenza Iniziale',
    description:
      'Iniziamo comprendendo le tue esigenze legali e fornendo orientamento esperto sulla tua situazione.',
    icon: Briefcase,
  },
  {
    step: '02',
    title: 'Revisione Documenti',
    description:
      'Esaminiamo attentamente tutti i documenti pertinenti e valutiamo i requisiti del tuo caso.',
    icon: FileText,
  },
  {
    step: '03',
    title: 'Sviluppo Strategia',
    description:
      'Sviluppiamo un approccio su misura per affrontare le tue specifiche esigenze legali e amministrative.',
    icon: Target,
  },
  {
    step: '04',
    title: 'Esecuzione Processo',
    description:
      'Gestiamo tutte le procedure, applicazioni e processi legali per tuo conto.',
    icon: Settings,
  },
  {
    step: '05',
    title: 'Supporto Continuativo',
    description:
      'Forniamo supporto continuo e garantiamo che tutte le procedure siano completate con successo.',
    icon: Users,
  },
  {
    step: '06',
    title: 'Risoluzione Finale',
    description:
      'Consegniamo i risultati finali e ti forniamo tutta la documentazione necessaria.',
    icon: CheckCircle,
  },
];

export default function ServicesClient() {
  return (
    <>
      {/* Empty div like homepage */}
      <div className="bg-light-teal max-auto text-cyan hidden px-4 md:block">
        .
      </div>

      {/* Hero Section */}
      <section
        className="bg-new-beige relative overflow-hidden bg-cover bg-center bg-no-repeat py-20 lg:py-12"
        style={{
          backgroundImage: 'url(/images/banner/beigebanner.svg)',
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="bg-dark-teal text-new-white mt-6 inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                Servizi Professionali
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-new-navy font-family-roundex mb-6 text-4xl font-bold tracking-tight text-shadow-md lg:text-6xl"
            >
              I Nostri{' '}
              <span className="from-dark-teal to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                Servizi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-10 text-lg text-gray-700 lg:text-xl"
            >
              Servizi legali professionali e assistenza amministrativa su misura
              per le tue esigenze. Dai servizi CAF alla consulenza legale, siamo
              qui per aiutarti.
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full"></div>
      </section>

      {/* Categories Grid */}
      <section className="bg-new-navy/90 relative py-20 backdrop-blur-xl lg:py-24">
        {/* Floating glassmorphism elements */}
        <div className="bg-cyan/10 absolute top-10 right-10 h-28 w-28 rounded-full backdrop-blur-sm"></div>
        <div className="absolute bottom-20 left-20 h-36 w-36 rounded-full bg-white/5 backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
              <span className="pb-6 text-sm font-bold tracking-wide text-white uppercase">
                Le Nostre Specialità
              </span>
            </div>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-new-navy/95 relative overflow-hidden py-20 backdrop-blur-xl lg:py-24">
        {/* Background glassmorphism elements */}
        <div className="bg-dark-teal/10 absolute top-20 left-10 h-32 w-32 rounded-full backdrop-blur-sm"></div>
        <div className="bg-light-teal/10 absolute right-20 bottom-10 h-40 w-40 rounded-full backdrop-blur-sm"></div>
        <div className="bg-light-teal/5 absolute top-1/2 left-1/3 h-24 w-24 rounded-full backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="bg-light-teal/20 border-light-teal/30 mb-6 inline-block rounded-full border px-6 py-3 backdrop-blur-md">
              <span className="text-sm font-bold tracking-wide text-white uppercase">
                Il Nostro Metodo
              </span>
            </div>
            <h2 className="font-family-general-sans mb-6 text-3xl font-bold tracking-tight text-white drop-shadow-lg lg:text-5xl">
              Il Nostro <span className="text-light-teal">Processo</span>
            </h2>
            <p className="mb-16 text-lg leading-relaxed text-white/80">
              Una metodologia collaudata che garantisce risultati eccellenti in
              ogni fase del tuo progetto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
              >
                {/* Step Number */}
                <div className="bg-light-teal absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-xl font-bold text-white shadow-xl backdrop-blur-sm">
                  {step.step}
                </div>

                {/* Icon */}
                <step.icon className="text-light-teal mb-6 h-12 w-12" />

                {/* Content */}
                <h3 className="group-hover:text-light-teal font-family-general-sans mb-4 text-xl font-bold text-white drop-shadow-sm transition-colors">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-white/80">
                  {step.description}
                </p>

                {/* Hover Arrow */}
                <ArrowRight className="text-light-teal absolute right-6 bottom-6 h-6 w-6 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-new-navy/95 relative overflow-hidden py-20 backdrop-blur-xl lg:py-24">
        {/* Glassmorphism background elements */}
        <div className="bg-light-teal/10 absolute top-10 left-10 h-32 w-32 rounded-full backdrop-blur-sm"></div>
        <div className="bg-dark-teal/5 absolute right-20 bottom-20 h-40 w-40 rounded-full backdrop-blur-sm"></div>
        <div className="bg-light-teal/15 absolute top-1/2 left-1/4 h-24 w-24 rounded-full backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="relative">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <span className="bg-light-teal/20 border-light-teal/30 inline-block rounded-full border px-6 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-lg backdrop-blur-md">
                  Servizio Premium
                </span>
              </motion.div>

              <h2 className="font-family-general-sans mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-lg lg:text-5xl">
                Pronto per Iniziare il Tuo{' '}
                <span className="text-light-teal">Progetto?</span>
              </h2>

              <p className="mb-10 text-xl leading-relaxed text-white/80">
                Parliamo dei tuoi requisiti e creiamo qualcosa di straordinario
                insieme.
                <br />
                <span className="text-light-teal font-semibold">
                  Contattaci per una consulenza gratuita.
                </span>
              </p>

              <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:justify-center">
                <GlossyButton className="flex items-center justify-center px-8 py-3 text-sm font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight className="h-5 w-5" />
                    <span>Richiedi un Preventivo</span>
                  </div>
                </GlossyButton>
                <GlossyButton className="flex items-center justify-center px-8 py-3 text-sm font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>Chiamaci Ora</span>
                  </div>
                </GlossyButton>
              </div>

              {/* Enhanced Benefits List */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    icon: Target,
                    text: 'Consulenza Gratuita',
                    desc: 'Primo incontro senza impegno',
                  },
                  {
                    icon: Zap,
                    text: 'Supporto 24/7',
                    desc: 'Assistenza quando ne hai bisogno',
                  },
                  {
                    icon: CheckCircle2,
                    text: 'Garanzia Risultati',
                    desc: 'Soddisfazione garantita al 100%',
                  },
                ].map(benefit => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
                  >
                    <benefit.icon className="text-light-teal mb-4 h-10 w-10" />
                    <div className="mb-2 text-lg font-bold text-white drop-shadow-sm">
                      {benefit.text}
                    </div>
                    <div className="text-sm text-white/80">{benefit.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Urgency Element */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <p className="text-light-teal inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-md">
                  Offerta limitata: primi 10 clienti ricevono il 20% di sconto
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
