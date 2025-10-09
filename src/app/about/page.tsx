'use client';

import { motion } from 'framer-motion';
import { Award, Users, Target, Lightbulb } from 'lucide-react';
import { SEO } from '@/components/seo';

const values = [
  {
    icon: Target,
    title: 'Orientati al Cliente',
    description:
      'Siamo impegnati a fornire servizi legali personalizzati che affrontano le esigenze e circostanze uniche di ogni cliente.',
  },
  {
    icon: Users,
    title: 'Professionalità',
    description:
      'Il nostro team esperto fornisce assistenza legale affidabile con i più alti standard di professionalità e riservatezza.',
  },
  {
    icon: Lightbulb,
    title: 'Conoscenza Esperta',
    description:
      'Rimaniamo aggiornati sulle leggi e regolamenti in evoluzione per fornire consulenza legale accurata e aggiornata.',
  },
  {
    icon: Award,
    title: 'Servizio di Fiducia',
    description:
      'Manteniamo i più alti standard etici e costruiamo relazioni durature basate sulla fiducia e sui risultati.',
  },
];

const stats = [
  { label: 'Casi Gestiti', value: '500+' },
  { label: 'Clienti Soddisfatti', value: '200+' },
  { label: 'Anni di Esperienza', value: '15+' },
  { label: 'Specializzazioni Legali', value: '10+' },
];

export default function About() {
  return (
    <>
      <SEO
        title="Chi Siamo - CafPotranto Servizi Legali"
        description="Scopri la nostra missione, valori e il team legale esperto di CafPotranto. Siamo dedicati a fornire servizi legali eccezionali e assistenza amministrativa."
        url="/about"
      />

      {/* Empty div like homepage */}
      <div className="bg-cyan max-auto text-cyan hidden px-4 md:block">.</div>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-linear-to-bl bg-gradient-to-br py-10"
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
              Chi Siamo <span className="text-primary">Il Nostro Studio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-8 text-xl"
            >
              Siamo un team dedicato di professionisti legali impegnati a
              fornire servizi legali eccezionali e assistenza amministrativa ai
              nostri clienti.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-foreground py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-background mb-6 text-3xl font-bold tracking-tight">
                Chi Siamo
              </h2>
              <div className="text-background space-y-4">
                <p className="pb-8">
                  Da oltre cinque anni siamo un punto di riferimento affidabile
                  per cittadini e aziende nella gestione di pratiche fiscali,
                  previdenziali e amministrative. AZ CAF-Patronato nasce con
                  l’obiettivo di offrire un servizio completo, chiaro e
                  accessibile, in grado di semplificare le procedure
                  burocratiche e fornire un supporto concreto a chi ne ha
                  bisogno. <br /> Grazie a un team qualificato, gentile e
                  costantemente aggiornato, garantiamo assistenza personalizzata
                  e attenta, mettendo sempre al centro le esigenze di ogni
                  singola persona. Operiamo con serietà, trasparenza e
                  attenzione, offrendo soluzioni rapide e su misura. Il nostro
                  impegno quotidiano è quello di essere sempre vicini alla
                  comunità, offrendo un servizio professionale ma anche umano,
                  fondato sull’ascolto, la competenza e la fiducia
                </p>
              </div>
              <h2 className="text-background mb-6 text-3xl font-bold tracking-tight">
                La Nostra Visione
              </h2>
              <div className="text-background space-y-4">
                <p className="pb-8">
                  Ambiamo a diventare il punto di riferimento nel settore dei
                  servizi legali nella nostra regione, distinguendoci per
                  l’eccellenza e la competenza nei servizi CAF e Patronato, nel
                  diritto del lavoro e nelle procedure amministrative.
                  Immaginiamo un futuro in cui l’assistenza legale sia
                  trasparente, efficiente e realmente accessibile a tutti coloro
                  che necessitano di supporto, contribuendo a semplificare il
                  rapporto tra cittadini, istituzioni e normative
                </p>
              </div>
              <h2 className="text-background mb-6 text-3xl font-bold tracking-tight">
                La Nostra Missione
              </h2>
              <div className="text-background space-y-4">
                <p className="pb-8">
                  fornire servizi legali accessibili, professionali e completi,
                  che aiutino individui e aziende a orientarsi con sicurezza
                  all’interno di processi legali e amministrativi spesso
                  complessi. Ci impegniamo ogni giorno a offrire soluzioni
                  personalizzate, pensate per tutelare gli interessi dei nostri
                  clienti e favorire il raggiungimento dei loro obiettivi. Il
                  nostro approccio si fonda su competenza, trasparenza e
                  gentilezza, valori che ci guidano nel costruire un rapporto di
                  fiducia solido e duraturo con ogni persona che si rivolge a
                  noi
                </p>
              </div>
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

      {/* Values Section */}
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
              I nostri valori
            </h2>
            <p className="text-muted-foreground mb-16 text-lg">
              I principi che guidano tutto ciò che facciamo e modellano come
              lavoriamo con i nostri clienti e tra di noi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-accent-foreground rounded-lg border p-6 text-center shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                  border: 'none',
                  color: '#142850',
                }}
              >
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <value.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-accent-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-24"
        style={{
          background:
            'radial-gradient(circle,rgba(201, 95, 42, 1) 0%, rgba(229, 104, 41, 1) 48%, rgba(240, 123, 63, 1) 68%, rgba(255, 212, 96, 1) 100%)',
        }}
      >
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              I Numeri Parlano
            </h2>
            <p className="text-muted-foreground mb-16 text-lg">
              I nostri risultati parlano da soli. Ecco cosa abbiamo realizzato
              insieme ai nostri straordinari clienti.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-background mb-2 text-4xl font-bold sm:text-5xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="grad-up-cyan py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg border p-8 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                border: 'none',
                color: '#142850',
              }}
            >
              <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Target className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-accent-foreground mb-4 text-2xl font-bold">
                La nostra missione
              </h3>
              <p className="text-accent-foreground leading-relaxed">
                Fornire servizi legali accessibili, professionali e completi che
                permettano a individui e aziende di navigare processi legali e
                amministrativi complessi con fiducia. Siamo impegnati a fornire
                soluzioni personalizzate che proteggano gli interessi dei nostri
                clienti e raggiungano i loro obiettivi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border p-8 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                border: 'none',
                color: '#142850',
              }}
            >
              <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Lightbulb className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-accent-foreground mb-4 text-2xl font-bold">
                La Nostra Visione
              </h3>
              <p className="text-accent-foreground leading-relaxed">
                Essere il principale fornitore di servizi legali nella nostra
                regione, riconosciuto per la nostra competenza nei servizi CAF e
                Patronato, diritto del lavoro e procedure amministrative.
                Immaginiamo un futuro in cui l'assistenza legale è trasparente,
                efficiente e accessibile a tutti coloro che ne hanno bisogno.
              </p>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-foreground mb-8 text-2xl font-bold">
              Why Choose CafPotranto?
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-card/50 rounded-lg border p-6">
                <h4 className="text-foreground mb-2 font-semibold">
                  Specialized Expertise
                </h4>
                <p className="text-muted-foreground text-sm">
                  Conoscenza approfondita in CAF, Patronato e diritto
                  amministrativo italiano
                </p>
              </div>
              <div className="bg-card/50 rounded-lg border p-6">
                <h4 className="text-foreground mb-2 font-semibold">
                  Personal Approach
                </h4>
                <p className="text-muted-foreground text-sm">
                  Soluzioni su misura che affrontano le tue esigenze legali
                  specifiche
                </p>
              </div>
              <div className="bg-card/50 rounded-lg border p-6">
                <h4 className="text-foreground mb-2 font-semibold">
                  Proven Results
                </h4>
                <p className="text-muted-foreground text-sm">
                  15+ anni di risoluzione di casi di successo e soddisfazione
                  del cliente
                </p>
              </div>
            </div>
          </motion.div> */}
        </div>
      </section>
    </>
  );
}
