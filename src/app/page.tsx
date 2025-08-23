'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Shield, Users } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import CategoriesGrid from '@/components/services/CategoriesGrid';
import { SEO } from '@/components/seo';

const features = [
  {
    icon: FileText,
    title: 'Administrative Assistance',
    description:
      'Expert help with forms, procedures, and bureaucratic processes for citizens and businesses.',
  },
  {
    icon: Shield,
    title: 'Legal Compliance',
    description:
      'Ensure your procedures are compliant with Italian regulations and requirements.',
  },
  {
    icon: Users,
    title: 'Personalized Service',
    description:
      'Dedicated support tailored to your specific needs and circumstances.',
  },
];

const benefits = [
  'Professional CAF and Patronato services',
  'ISEE, NASpI, and SPID assistance',
  'Work and pension consultations',
  'Family benefits and income support',
];

export default function Home() {
  return (
    <>
      <SEO
        title="CafPotranto - Legal Services & Administrative Assistance"
        description="Professional legal services for businesses and citizens to manage online procedures. Expert assistance with CAF and Patronato services, work benefits, pensions, and administrative procedures."
        url="/"
      />

      {/* Search/Filter Section */}
      <section className="border-b bg-foreground py-6 z-30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-accent-foreground mb-2">
                Find Legal Services
              </h2>
              <p className="text-sm text-accent-foreground">
                Search for specific legal services or administrative assistance
              </p>
            </div>
            <Combobox
              placeholder="Search services (e.g., CAF, Patronato, ISEE)..."
              options={[
                { value: "caf", label: "CAF Services" },
                { value: "patronato", label: "Patronato Services" },
                { value: "isee", label: "ISEE Assistance" },
                { value: "naspi", label: "NASpI Support" },
                { value: "spid", label: "SPID Services" },
                { value: "pension", label: "Pension Planning" },
                { value: "benefits", label: "Family Benefits" },
              ]}
              className="max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

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
              Legal Services &
              <span className="text-primary"> Administrative Assistance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Professional legal services for businesses and citizens to manage
              online procedures. Expert assistance with CAF and Patronato services,
              work benefits, pensions, and administrative procedures.
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
          <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
        </div>
      </section>

      {/* Service Categories Section */}
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
              Our Service Categories
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Explore our comprehensive range of legal services and administrative assistance. 
              Each category offers specialized support tailored to your specific needs.
            </p>
          </motion.div>

          <CategoriesGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Why Choose Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-16 text-lg text-muted-foreground"
            >
              We provide comprehensive legal assistance and administrative support
              to simplify your bureaucratic processes.
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
                className="rounded-lg border bg-card p-6 text-center shadow-sm text-accent-foreground"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-8 w-8 text-primary" />
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for Success
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Our development approach ensures your project is delivered on
                time, within budget, and exceeds expectations. We focus on
                quality, performance, and scalability.
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
                    <CheckCircle className="h-5 w-5 text-primary" />
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
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/40" />
              <div className="absolute inset-4 rounded-lg bg-card shadow-xl" />
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
              Need Legal Assistance?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Contact us today for professional legal services and administrative support.
              Our expert team is ready to help you navigate complex procedures.
            </p>
            <CTAButton size="lg" className="text-lg">
              Schedule Consultation
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
