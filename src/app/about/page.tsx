'use client';

import { motion } from 'framer-motion';
import { Award, Users, Target, Lightbulb } from 'lucide-react';
import Image from 'next/image';
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
              <span className="bg-dark-teal text-new-white mt-8 inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                Il Nostro Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-new-navy font-family-roundex mb-6 text-4xl font-bold tracking-tight text-shadow-md lg:text-6xl"
            >
              Chi{' '}
              <span className="from-dark-teal to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                Siamo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-10 text-lg text-gray-700 lg:text-xl"
            >
              Siamo un team dedicato di professionisti legali impegnati a
              fornire servizi legali eccezionali e assistenza amministrativa ai
              nostri clienti.
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full"></div>
      </section>

      {/* Chi Siamo Section */}
      <section className="bg-new-navy py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-new-white font-family-general-sans mb-6 text-3xl font-bold tracking-tight">
                Chi <span className="text-new-beige">Siamo</span>
              </h2>
              <div className="text-new-dim-cyan space-y-6">
                <p className="leading-relaxed">
                  Da oltre cinque anni siamo un punto di riferimento affidabile
                  per cittadini e aziende nella gestione di pratiche fiscali,
                  previdenziali e amministrative. AZ CAF-Patronato nasce con
                  l'obiettivo di offrire un servizio completo, chiaro e
                  accessibile, in grado di semplificare le procedure
                  burocratiche e fornire un supporto concreto a chi ne ha
                  bisogno.
                </p>
                <p className="leading-relaxed">
                  Grazie a un team qualificato, gentile e costantemente
                  aggiornato, garantiamo assistenza personalizzata e attenta,
                  mettendo sempre al centro le esigenze di ogni singola persona.
                  Operiamo con serietà, trasparenza e attenzione, offrendo
                  soluzioni rapide e su misura.
                </p>
                <div className="bg-new-light-navy/30 border-new-dim-cyan/30 rounded-lg border p-6">
                  <p className="text-new-beige font-medium">
                    Il nostro impegno quotidiano è quello di essere sempre
                    vicini alla comunità, offrendo un servizio professionale ma
                    anche umano, fondato sull'ascolto, la competenza e la
                    fiducia.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex-1"
            >
              <div className="border-new-beige/30 hover:border-new-beige/50 aspect-video overflow-hidden rounded-2xl border-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/webimages/whoweare.webp"
                  alt="Chi Siamo - Il nostro team di professionisti legali"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* La Nostra Visione Section */}
      <section className="bg-new-white py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-new-navy font-family-general-sans mb-6 text-3xl font-bold tracking-tight">
                La Nostra <span className="text-light-teal">Visione</span>
              </h2>
              <div className="text-new-light-navy space-y-6">
                <p className="leading-relaxed">
                  Ambiamo a diventare il punto di riferimento nel settore dei
                  servizi legali nella nostra regione, distinguendoci per
                  l'eccellenza e la competenza nei servizi CAF e Patronato, nel
                  diritto del lavoro e nelle procedure amministrative.
                </p>
                <div className="bg-light-teal/10 border-light-teal/30 rounded-lg border p-6">
                  <p className="text-light-teal font-medium">
                    Immaginiamo un futuro in cui l'assistenza legale sia
                    trasparente, efficiente e realmente accessibile a tutti
                    coloro che necessitano di supporto, contribuendo a
                    semplificare il rapporto tra cittadini, istituzioni e
                    normative.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex-1"
            >
              <div className="border-light-teal/40 hover:border-light-teal/60 aspect-video overflow-hidden rounded-2xl border-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(12,150,156,0.3)]">
                <Image
                  src="/images/webimages/vission.webp"
                  alt="La Nostra Visione - Futuro dei servizi legali"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* La Nostra Missione Section */}
      <section className="bg-new-beige py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-new-navy font-family-general-sans mb-6 text-3xl font-bold tracking-tight">
                La Nostra <span className="text-dark-teal">Missione</span>
              </h2>
              <div className="text-new-light-navy space-y-6">
                <p className="leading-relaxed">
                  Fornire servizi legali accessibili, professionali e completi,
                  che aiutino individui e aziende a orientarsi con sicurezza
                  all'interno di processi legali e amministrativi spesso
                  complessi. Ci impegniamo ogni giorno a offrire soluzioni
                  personalizzate, pensate per tutelare gli interessi dei nostri
                  clienti e favorire il raggiungimento dei loro obiettivi.
                </p>
                <div className="bg-dark-teal/20 border-dark-teal/30 rounded-lg border p-6">
                  <p className="text-dark-teal font-medium">
                    Il nostro approccio si fonda su competenza, trasparenza e
                    gentilezza, valori che ci guidano nel costruire un rapporto
                    di fiducia solido e duraturo con ogni persona che si rivolge
                    a noi.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex-1"
            >
              <div className="border-dark-teal/40 hover:border-dark-teal/60 aspect-video overflow-hidden rounded-2xl border-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(10,112,117,0.3)]">
                <Image
                  src="/images/webimages/mission.webp"
                  alt="La Nostra Missione - Servizi legali accessibili e professionali"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-new-navy/95 relative overflow-hidden py-20 backdrop-blur-xl lg:py-24">
        {/* Glassmorphism Background Elements */}
        <div className="bg-light-teal/10 absolute top-20 left-20 h-40 w-40 rounded-full backdrop-blur-sm"></div>
        <div className="bg-dark-teal/5 absolute right-10 bottom-10 h-32 w-32 rounded-full backdrop-blur-sm"></div>
        <div className="bg-light-teal/15 absolute top-1/3 right-1/4 h-24 w-24 rounded-full backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="border-light-teal/30 bg-light-teal/10 mb-6 inline-block rounded-full border px-6 py-3 backdrop-blur-md">
              <span className="text-sm font-bold tracking-wide text-white uppercase">
                I Nostri Principi
              </span>
            </div>
            <h2 className="font-family-general-sans mb-4 text-3xl font-bold tracking-tight text-white drop-shadow-lg lg:text-4xl">
              I Nostri <span className="text-light-teal">Valori</span>
            </h2>
            <p className="mb-16 text-lg leading-relaxed text-white/80">
              I principi che guidano tutto ciò che facciamo e modellano come
              lavoriamo con i nostri clienti e tra di noi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
              >
                <div className="bg-light-teal/20 border-light-teal/40 group-hover:bg-light-teal group-hover:border-light-teal/60 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300">
                  <value.icon className="text-light-teal h-8 w-8 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="group-hover:text-light-teal font-family-general-sans mb-3 text-lg font-bold text-white drop-shadow-sm transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {value.description}
                </p>

                {/* Glassmorphism accent corner */}
                <div className="bg-light-teal absolute top-4 right-4 h-3 w-3 rounded-full opacity-60 shadow-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="hidden py-24"
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
            <h2 className="text-foreground font-family-general-sans mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
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
    </>
  );
}
