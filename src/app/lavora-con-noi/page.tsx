'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Users,
  Briefcase,
  Trophy,
  Target,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Star,
  Heart,
  Lightbulb,
  Award,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import GlossyButton from '@/components/ui/glossy-button';

const jobProfiles = [
  {
    icon: Briefcase,
    title: 'Consulente Fiscale',
    description:
      'Esperienza nella gestione di pratiche fiscali, dichiarazioni e consulenza tributaria.',
    requirements: [
      'Laurea in Economia, Giurisprudenza o affini',
      'Esperienza minima 2 anni nel settore',
      'Conoscenza normative fiscali',
    ],
  },
  {
    icon: Users,
    title: 'Operatore CAF',
    description:
      'Assistenza diretta ai clienti per pratiche amministrative e burocratiche.',
    requirements: [
      'Diploma di scuola superiore',
      'Orientamento al cliente',
      'Precisione e attenzione ai dettagli',
    ],
  },
  {
    icon: Target,
    title: 'Esperto Previdenziale',
    description:
      'Specialista in pratiche pensionistiche, INPS e previdenza complementare.',
    requirements: [
      'Conoscenza normative previdenziali',
      'Esperienza con portali INPS',
      'Capacità di problem solving',
    ],
  },
  {
    icon: Award,
    title: 'Assistente Immigrazione',
    description:
      'Supporto per pratiche di immigrazione, permessi di soggiorno e cittadinanza.',
    requirements: [
      'Conoscenza procedure immigrazione',
      'Lingue straniere (preferibile)',
      'Empatia e pazienza',
    ],
  },
];

const benefits = [
  {
    icon: Trophy,
    title: 'Crescita Professionale',
    description:
      'Opportunità di formazione continua e sviluppo delle competenze.',
  },
  {
    icon: Heart,
    title: 'Ambiente Stimolante',
    description:
      'Team dinamico e collaborativo con focus sul benessere del personale.',
  },
  {
    icon: Star,
    title: 'Riconoscimenti',
    description: 'Sistema di incentivi e riconoscimenti basato sui risultati.',
  },
  {
    icon: Lightbulb,
    title: 'Innovazione',
    description: 'Utilizzo di tecnologie moderne e processi digitalizzati.',
  },
];

const values = [
  'Competenza e professionalità',
  'Attenzione al cliente',
  'Trasparenza nelle relazioni',
  'Crescita continua',
  'Lavoro di squadra',
  'Integrità e onestà',
];

export default function LavoraConNoi() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Salve, sono interessato/a a lavorare con voi. Vorrei maggiori informazioni sulle posizioni disponibili.'
    );
    window.open(`https://wa.me/393495214147?text=${message}`, '_blank');
  };

  return (
    <>
      <SEO
        title="Lavora con Noi - CafPatronatoAZ"
        description="Unisciti al nostro team! Cerchiamo persone brillanti per rafforzare il nostro Centro di Assistenza Fiscale. Scopri le posizioni aperte e invia la tua candidatura."
        url="/lavora-con-noi"
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
              <span className="bg-dark-teal text-new-white mt-6 inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                Opportunità di Carriera
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-new-navy font-family-roundex mb-6 text-4xl font-bold tracking-tight text-shadow-md lg:text-6xl"
            >
              Lavora{' '}
              <span className="from-dark-teal to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                con Noi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-10 text-lg text-gray-700 lg:text-xl"
            >
              Entra a far parte del nostro team! Siamo sempre alla ricerca di
              persone brillanti che vogliano collaborare con noi. Se sei
              interessato ad un'esperienza di lavoro all'interno di uno dei
              principali Centri di Assistenza Fiscale, non perdere altro tempo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            ></motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full"></div>
      </section>

      {/* Job Profiles Section */}
      <section className="bg-new-navy py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="text-new-white font-family-general-sans mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
              Profili <span className="text-new-beige">Ricercati</span>
            </h2>
            <p className="text-new-dim-cyan text-lg">
              Scopri le posizioni aperte e trova quella più adatta alle tue
              competenze e aspirazioni professionali.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {jobProfiles.map((profile, index) => (
              <motion.div
                key={profile.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-new-beige/20 bg-new-white/10 rounded-3xl border p-8 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02]"
              >
                <div className="bg-light-teal/20 border-light-teal/30 mb-6 flex h-16 w-16 items-center justify-center rounded-full border">
                  <profile.icon className="text-light-teal h-8 w-8" />
                </div>

                <h3 className="text-new-white font-family-general-sans mb-4 text-xl font-bold">
                  {profile.title}
                </h3>

                <p className="text-new-dim-cyan mb-6">{profile.description}</p>

                <div className="space-y-3">
                  <h4 className="text-new-beige text-sm font-semibold tracking-wide uppercase">
                    Requisiti:
                  </h4>
                  <ul className="space-y-2">
                    {profile.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="text-light-teal mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-new-dim-cyan text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-new-white py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="text-new-navy font-family-general-sans mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
              Perché Scegliere <span className="text-light-teal">Noi</span>
            </h2>
            <p className="text-new-light-navy text-lg">
              Offriamo un ambiente di lavoro stimolante con opportunità di
              crescita e benefit competitivi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-light-teal/30 bg-light-teal/10 rounded-3xl border p-6 text-center shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02]"
              >
                <div className="bg-light-teal/20 border-light-teal/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border">
                  <benefit.icon className="text-light-teal h-8 w-8" />
                </div>

                <h3 className="text-new-navy font-family-general-sans mb-3 text-lg font-bold">
                  {benefit.title}
                </h3>

                <p className="text-new-light-navy text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
                I Nostri <span className="text-new-beige">Valori</span>
              </h2>
              <div className="text-new-dim-cyan space-y-6">
                <p className="leading-relaxed">
                  Siamo un team di persone competenti al fianco di lavoratori
                  dipendenti, autonomi, pensionati, studenti, famiglie e
                  società. Le nostre competenze migliori sono a disposizione per
                  le tue esigenze.
                </p>
                <div className="bg-new-light-navy/30 border-new-dim-cyan/30 rounded-lg border p-6">
                  <p className="text-new-beige mb-4 font-medium">
                    Cerchiamo persone che condividano i nostri valori:
                  </p>
                  <ul className="space-y-3">
                    {values.map((value, index) => (
                      <motion.li
                        key={value}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="text-light-teal h-5 w-5 flex-shrink-0" />
                        <span className="text-new-dim-cyan">{value}</span>
                      </motion.li>
                    ))}
                  </ul>
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
              <div className="border-new-white/80 bg-new-white/80 relative aspect-square overflow-hidden rounded-2xl border-8 p-2 shadow-2xl">
                <div className="h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/jointeam.webp"
                    alt="Join Our Team - Unisciti al nostro team professionale"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                  />
                  {/* Light teal overlay */}
                  <div className="bg-light-teal/15 absolute inset-2 rounded-xl backdrop-blur-[0.5px]"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-new-white py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-light-teal/30 bg-light-teal/10 mx-auto max-w-4xl rounded-3xl border p-12 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="bg-light-teal/20 border-light-teal/30 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border">
              <Mail className="text-light-teal h-10 w-10" />
            </div>

            <h2 className="text-new-navy font-family-general-sans mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
              Pronto a Unirti a Noi?
            </h2>

            <p className="text-new-light-navy mb-8 text-lg">
              Invia la tua candidatura oggi stesso! Siamo sempre interessati a
              conoscere persone motivate e competenti che vogliano crescere
              professionalmente con noi.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <GlossyButton onClick={handleWhatsAppClick} className="px-6 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>+3668735046</span>
                </div>
              </GlossyButton>
            </div>

            <div className="border-light-teal/20 mt-8 border-t pt-8">
              <div className="text-new-light-navy flex flex-col items-center justify-center gap-6 text-sm md:flex-row">
                <div className="flex items-center gap-2">
                  <Mail className="text-light-teal h-4 w-4" />
                  <span>CAFLORENTEGGIO@GMAIL.COM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-light-teal h-4 w-4" />
                  <span>02.61460044</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-light-teal h-4 w-4" />
                  <span>Via Lorenteggio, 172 - Milano</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
