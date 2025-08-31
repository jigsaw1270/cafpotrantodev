'use client';

import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import { CTAButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Users,
    title: 'Lavoro e Pensioni',
    description:
      'Assistenza professionale con procedure legate al lavoro e pianificazione pensionistica.',
  },
  {
    icon: Shield,
    title: 'Sostegno al Reddito e Famiglia',
    description:
      'Orientamento su benefici familiari, sostegno al reddito e programmi di assistenza sociale.',
  },
  {
    icon: FileText,
    title: 'Benefici di Disoccupazione e Disabilità',
    description:
      'Aiuto esperto con richieste di disoccupazione e domande per benefici di disabilità.',
  },
  {
    icon: CheckCircle,
    title: 'Moduli e Procedure',
    description:
      'Compilazione completa e supporto per tutti i moduli e le procedure richieste.',
  },
];

const specializedServices = [
  'ISEE (Indicatore della Situazione Economica Equivalente)',
  "NASpI (Nuova Assicurazione Sociale per l'Impiego)",
  'SPID (Sistema Pubblico di Identità Digitale)',
  'Assegni familiari e benefici',
  'Valutazioni di disabilità',
  'Calcoli pensionistici',
  'Assistenza fiscale',
  'Preparazione documenti legali',
];

export default function Consulting() {
  return (
    <>
      <SEO
        title="Consulenza Online - CafPotranto Servizi Legali"
        description="Expert online consulting for work, family, pensions, and income support. Professional assistance with CAF and Patronato services and procedures."
        url="/consulting"
      />

      {/* Hero Section */}
      <section className="from-background to-secondary/20 relative overflow-hidden bg-gradient-to-br py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Consulenza <span className="text-primary">in linea</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-8 text-xl"
            >
              Hai bisogno di consigli su questioni relative al lavoro, alla
              famiglia, alle pensioni o al sostegno al reddito?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-lg border p-6 shadow-sm"
            >
              <p className="text-accent-foreground text-lg">
                Un esperto in servizi e procedure CAF e Patronato sarà a vostra
                disposizione! Offriamo consulenze per i seguenti prodotti:
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              I nostri servizi di consulenza
            </h2>
            <p className="text-muted-foreground mb-16 text-lg">
              Consulenza e supporto professionale per tutte le vostre esigenze
              legali e amministrative.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border p-6 text-center shadow-sm"
              >
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <service.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-accent-foreground mb-2 text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-accent-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
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
                Assistenza Specializzata
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Il nostro team fornisce assistenza esperta con procedure e
                documentazione complesse. Siamo specializzati nell'aiutarti a
                navigare il processo burocratico in modo efficiente.
              </p>

              <ul className="space-y-3">
                {specializedServices.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg border p-8 shadow-sm"
            >
              <h3 className="text-foreground mb-6 text-2xl font-bold">
                Contact Our Experts
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-accent-foreground font-semibold">
                      Phone Consultation
                    </h4>
                    <p className="text-accent-foreground">+39 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-accent-foreground font-semibold">
                      Email Support
                    </h4>
                    <p className="text-accent-foreground">
                      consulenza@cafpotranto.it
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-accent-foreground font-semibold">
                      Office Location
                    </h4>
                    <p className="text-accent-foreground">
                      Via Roma 123, Milano, Italy
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <CTAButton size="lg" className="w-full">
                  Schedule Consultation
                </CTAButton>
              </div>
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
              Pronto per Ottenere Aiuto Professionale?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Non affrontare procedure complesse da solo. I nostri esperti sono
              qui per guidarti attraverso ogni fase del processo.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <CTAButton size="lg" className="text-lg">
                Prenota Consulenza
              </CTAButton>
              <Button variant="outline" size="lg" className="text-lg">
                Scopri di Più
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
