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
      <section className="bg-new-beige relative overflow-hidden py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="bg-dark-teal text-new-white inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                Servizi Professionali
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-new-navy mb-6 text-4xl font-bold tracking-tight lg:text-6xl"
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
              className="text-new-light-navy mb-10 text-lg lg:text-xl"
            >
              Servizi legali professionali e assistenza amministrativa su misura
              per le tue esigenze. Dai servizi CAF alla consulenza legale, siamo
              qui per aiutarti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            ></motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full"></div>
      </section>

      {/* Categories Grid */}
      <section className="bg-new-navy py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-new-white mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
              Le Nostre Categorie di{' '}
              <span className="text-new-beige">Servizi</span>
            </h2>
            <p className="text-new-dim-cyan mb-16 text-lg">
              Esplora la nostra gamma completa di servizi legali e assistenza
              amministrativa. Ogni categoria offre supporto specializzato su
              misura per le tue esigenze specifiche.
            </p>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-new-white py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-new-navy mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
              Il Nostro <span className="text-dark-teal">Processo</span>
            </h2>
            <p className="text-new-light-navy mb-16 text-lg">
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
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Step Number */}
                <div className="from-dark-teal to-light-teal absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r text-xl font-bold text-white shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <step.icon className="text-dark-teal mb-4 h-12 w-12" />

                {/* Content */}
                <h3 className="text-new-navy group-hover:text-dark-teal mb-3 text-xl font-bold transition-colors">
                  {step.title}
                </h3>
                <p className="text-new-light-navy leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Arrow */}
                <ArrowRight className="text-light-teal absolute right-6 bottom-6 h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-new-navy relative overflow-hidden py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="bg-new-beige absolute top-10 left-10 h-32 w-32 rounded-full"></div>
              <div className="bg-light-teal absolute right-10 bottom-10 h-24 w-24 rounded-full"></div>
              <div className="bg-dark-teal absolute top-1/2 left-1/4 h-16 w-16 rounded-full"></div>
            </div>

            <div className="relative">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <span className="from-dark-teal to-light-teal inline-block rounded-full bg-gradient-to-r px-6 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-lg">
                  Servizio Premium
                </span>
              </motion.div>

              <h2 className="text-new-white mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
                Pronto per Iniziare il Tuo{' '}
                <span className="from-new-beige to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                  Progetto?
                </span>
              </h2>

              <p className="text-new-dim-cyan mb-10 text-xl leading-relaxed">
                Parliamo dei tuoi requisiti e creiamo qualcosa di straordinario
                insieme.
                <br />
                <span className="text-new-beige font-semibold">
                  Contattaci per una consulenza gratuita.
                </span>
              </p>

              <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
                <button className="from-dark-teal to-light-teal hover:from-light-teal hover:to-dark-teal flex transform items-center justify-center gap-2 rounded-full bg-gradient-to-r px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105">
                  <ArrowRight className="h-5 w-5" />
                  Richiedi un Preventivo
                </button>
                <button className="border-new-beige text-new-beige hover:bg-new-beige hover:text-new-navy flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl">
                  <Phone className="h-5 w-5" />
                  Chiamaci Ora
                </button>
              </div>

              {/* Enhanced Benefits List */}
              <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
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
                    className="bg-new-light-navy/20 border-new-dim-cyan/30 hover:bg-new-light-navy/30 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300"
                  >
                    <benefit.icon className="text-light-teal mb-3 h-8 w-8" />
                    <div className="text-new-beige mb-2 text-lg font-bold">
                      {benefit.text}
                    </div>
                    <div className="text-new-dim-cyan text-sm">
                      {benefit.desc}
                    </div>
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
                <p className="text-light-teal text-sm font-medium">
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
