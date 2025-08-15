'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Users,
  CreditCard,
  Shield,
  Calculator,
  Briefcase,
  CheckCircle,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import { CTAButton } from '@/components/ui/cta-button';

const services = [
  {
    icon: FileText,
    title: 'CAF Services',
    description:
      'Complete tax assistance and fiscal consultation for individuals and businesses.',
    features: [
      'Tax return preparation',
      'Fiscal consultation',
      'Document assistance',
      'Online tax filing',
    ],
  },
  {
    icon: Users,
    title: 'Patronato Services',
    description:
      'Professional assistance with work benefits, pensions, and social security matters.',
    features: [
      'Pension calculations',
      'Disability benefits',
      'Maternity benefits',
      'Work injury claims',
    ],
  },
  {
    icon: CreditCard,
    title: 'Financial Assistance',
    description:
      'Expert guidance on financial matters, loans, and economic support programs.',
    features: [
      'Loan applications',
      'Financial planning',
      'Subsidy applications',
      'Economic consultation',
    ],
  },
  {
    icon: Shield,
    title: 'Legal Protection',
    description:
      'Comprehensive legal support and protection services for businesses and individuals.',
    features: [
      'Legal consultation',
      'Document review',
      'Dispute resolution',
      'Contract assistance',
    ],
  },
  {
    icon: Calculator,
    title: 'Administrative Procedures',
    description:
      'Simplify complex administrative processes with our expert assistance.',
    features: [
      'Permit applications',
      'License renewals',
      'Bureaucratic procedures',
      'Document preparation',
    ],
  },
  {
    icon: Briefcase,
    title: 'Business Services',
    description:
      'Comprehensive business support including company formation and compliance.',
    features: [
      'Company registration',
      'Business compliance',
      'Corporate procedures',
      'Regulatory assistance',
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Initial Consultation',
    description:
      'We start by understanding your legal needs and providing expert guidance on your situation.',
  },
  {
    step: '02',
    title: 'Document Review',
    description:
      'We carefully review all relevant documents and assess your case requirements.',
  },
  {
    step: '03',
    title: 'Strategy Development',
    description:
      'We develop a tailored approach to address your specific legal and administrative needs.',
  },
  {
    step: '04',
    title: 'Process Execution',
    description:
      'We handle all procedures, applications, and legal processes on your behalf.',
  },
  {
    step: '05',
    title: 'Follow-up Support',
    description:
      'We provide ongoing support and ensure all procedures are completed successfully.',
  },
  {
    step: '06',
    title: 'Final Resolution',
    description:
      'We deliver final results and provide you with all necessary documentation.',
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services - CafPotranto Legal Services"
        description="Comprehensive legal services including CAF assistance, Patronato services, administrative procedures, and legal consultation. Expert help for all your legal needs."
        url="/services"
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
              Our <span className="text-primary">Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Professional legal services and administrative assistance tailored to your
              needs. From CAF services to legal consultation, we're here to help.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
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
              What We Offer
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Full-stack development services designed to bring your digital
              vision to life with modern technologies and best practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-4 text-muted-foreground">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Process
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              A proven methodology that ensures your project is delivered on
              time, within budget, and exceeds your expectations.
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
                className="relative rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 text-2xl font-bold text-primary">
                  {step.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
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
              Ready to Start Your Project?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let's discuss your requirements and create something amazing
              together. Get in touch for a free consultation.
            </p>
            <CTAButton size="lg" className="text-lg">
              Get a Quote
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
