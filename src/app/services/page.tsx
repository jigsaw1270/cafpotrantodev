'use client';

import { motion } from 'framer-motion';
import { SEO } from '@/components/seo';
import { CTAButton } from '@/components/ui/cta-button';
import CategoriesGrid from '@/components/services/CategoriesGrid';

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

      {/* Categories Grid */}
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
