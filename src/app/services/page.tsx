'use client';

import { motion } from 'framer-motion';
import { SEO } from '@/components/seo';
import { CTAButton } from '@/components/ui/cta-button';
import CategoriesGrid from '@/components/services/CategoriesGrid';

const process = [
  {
    step: '01',
    title: 'Consulenza Iniziale',
    description:
      'Iniziamo comprendendo le tue esigenze legali e fornendo orientamento esperto sulla tua situazione.',
  },
  {
    step: '02',
    title: 'Revisione Documenti',
    description:
      'Esaminiamo attentamente tutti i documenti pertinenti e valutiamo i requisiti del tuo caso.',
  },
  {
    step: '03',
    title: 'Sviluppo Strategia',
    description:
      'Sviluppiamo un approccio su misura per affrontare le tue specifiche esigenze legali e amministrative.',
  },
  {
    step: '04',
    title: 'Esecuzione Processo',
    description:
      'Gestiamo tutte le procedure, applicazioni e processi legali per tuo conto.',
  },
  {
    step: '05',
    title: 'Supporto Continuativo',
    description:
      'Forniamo supporto continuo e garantiamo che tutte le procedure siano completate con successo.',
  },
  {
    step: '06',
    title: 'Risoluzione Finale',
    description:
      'Consegniamo i risultati finali e ti forniamo tutta la documentazione necessaria.',
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="I Nostri Servizi - CafPotranto Servizi Legali"
        description="Servizi legali completi inclusi assistenza CAF, servizi Patronato, procedure amministrative e consulenza legale. Aiuto esperto per tutte le tue esigenze legali."
        url="/services"
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-linear-to-bl bg-gradient-to-br py-24"
        style={{
          background:
            'linear-gradient(342deg,rgba(201, 95, 42, 1) 0%, rgba(229, 104, 41, 1) 6%, rgba(234, 113, 51, 1) 20%, rgba(240, 123, 63, 1) 33%, rgba(255, 212, 96, 1) 100%)',
        }}
      >
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
            >
              I Nostri <span className="text-primary">Servizi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-8 text-xl"
            >
              Servizi legali professionali e assistenza amministrativa su misura
              per le tue esigenze. Dai servizi CAF alla consulenza legale, siamo
              qui per aiutarti.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="grad-up-navy py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-foreground mb-4 hidden text-3xl font-bold tracking-tight sm:text-4xl lg:block">
              Le Nostre Categorie di Servizi
            </h2>
            <p className="text-muted-foreground mb-16 hidden text-lg lg:block">
              Esplora la nostra gamma completa di servizi legali e assistenza
              amministrativa. Ogni categoria offre supporto specializzato su
              misura per le tue esigenze specifiche.
            </p>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* Process Section */}
      <section className="grad-up-cyan py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Il Nostro Processo
            </h2>
            <p className="text-muted-foreground mb-16 text-lg">
              Una metodologia collaudata che garantisce che il tuo progetto
              venga consegnato in tempo, nel budget e superi le tue aspettative.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-lg border p-6 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                  border: 'none',
                  color: '#142850',
                }}
              >
                <div className="text-primary mb-4 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-accent-foreground mb-2 text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-accent-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="grad-up-navy py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto per Iniziare il Tuo Progetto?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Parliamo dei tuoi requisiti e creiamo qualcosa di straordinario
              insieme. Contattaci per una consulenza gratuita.
            </p>
            <CTAButton size="lg" className="text-lg">
              Richiedi un Preventivo
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
