'use client';

import { motion } from 'framer-motion';
import { Users, FileText, Shield, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { SEO } from '@/components/seo';
import { CTAButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Users,
    title: 'Work and Pensions',
    description: 'Professional assistance with employment-related procedures and pension planning.',
  },
  {
    icon: Shield,
    title: 'Income and Family Support',
    description: 'Guidance on family benefits, income support, and social assistance programs.',
  },
  {
    icon: FileText,
    title: 'Unemployment and Disability Benefits',
    description: 'Expert help with unemployment claims and disability benefit applications.',
  },
  {
    icon: CheckCircle,
    title: 'Forms and Procedures',
    description: 'Complete compilation and support for all required forms and procedures.',
  },
];

const specializedServices = [
  'ISEE (Equivalent Economic Situation Indicator)',
  'NASpI (New Social Insurance for Employment)',
  'SPID (Public Digital Identity System)',
  'Family allowances and benefits',
  'Disability assessments',
  'Pension calculations',
  'Tax assistance',
  'Legal document preparation',
];

export default function Consulting() {
  return (
    <>
      <SEO
        title="Online Consulting - CafPotranto Legal Services"
        description="Expert online consulting for work, family, pensions, and income support. Professional assistance with CAF and Patronato services and procedures."
        url="/consulting"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            >
              Online <span className="text-primary">Consulting</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Do you need advice on matters relating to work, family, pensions, or income support?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <p className="text-lg text-accent-foreground">
                An expert in CAF and Patronato services and procedures will be at your disposal! 
                We offer consultations for the following products:
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Consulting Services
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Professional guidance and support for all your legal and administrative needs.
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
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-accent-foreground">{service.title}</h3>
                <p className="text-accent-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Specialized Assistance
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Our team provides expert assistance with complex procedures and documentation. 
                We specialize in helping you navigate the bureaucratic process efficiently.
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
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
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
              className="rounded-lg border bg-card p-8 shadow-sm"
            >
              <h3 className="mb-6 text-2xl font-bold text-foreground">
                Contact Our Experts
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-foreground">Phone Consultation</h4>
                    <p className="text-accent-foreground">+39 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-foreground ">Email Support</h4>
                    <p className="text-accent-foreground">consulenza@cafpotranto.it</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-foreground">Office Location</h4>
                    <p className="text-accent-foreground">Via Roma 123, Milano, Italy</p>
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
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Get Professional Help?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Don't navigate complex procedures alone. Our experts are here to guide you 
              through every step of the process.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <CTAButton size="lg" className="text-lg">
                Book Consultation
              </CTAButton>
              <Button variant="outline" size="lg" className="text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
