'use client';

import { motion } from 'framer-motion';
import {
  Code,
  Smartphone,
  Search,
  Palette,
  ShoppingCart,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import { CTAButton } from '@/components/ui/cta-button';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Custom web applications built with modern technologies like React, Next.js, and TypeScript.',
    features: [
      'Responsive design',
      'Performance optimization',
      'SEO-friendly',
      'Scalable architecture',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Mobile-optimized experiences that work seamlessly across all devices and screen sizes.',
    features: [
      'Progressive Web Apps',
      'Cross-platform compatibility',
      'Touch-friendly interfaces',
      'Offline functionality',
    ],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description:
      'Comprehensive SEO strategies to improve your website\'s visibility and search rankings.',
    features: [
      'Technical SEO audit',
      'Content optimization',
      'Performance enhancement',
      'Analytics setup',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces designed with user experience and accessibility in mind.',
    features: [
      'User research',
      'Wireframing & prototyping',
      'Design systems',
      'Accessibility compliance',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description:
      'Complete e-commerce platforms with secure payment processing and inventory management.',
    features: [
      'Payment integration',
      'Inventory management',
      'Order processing',
      'Customer management',
    ],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Speed up your website with advanced optimization techniques and best practices.',
    features: [
      'Code splitting',
      'Image optimization',
      'Caching strategies',
      'Bundle optimization',
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We start by understanding your business goals, target audience, and project requirements.',
  },
  {
    step: '02',
    title: 'Planning',
    description:
      'We create a detailed project plan with timelines, milestones, and deliverables.',
  },
  {
    step: '03',
    title: 'Design',
    description:
      'We design wireframes and prototypes to visualize the user experience and interface.',
  },
  {
    step: '04',
    title: 'Development',
    description:
      'We build your application using modern technologies and best practices.',
  },
  {
    step: '05',
    title: 'Testing',
    description:
      'We thoroughly test your application across devices and browsers to ensure quality.',
  },
  {
    step: '06',
    title: 'Launch',
    description:
      'We deploy your application and provide ongoing support and maintenance.',
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services - CafPotranto Dev"
        description="Comprehensive web development services including custom applications, mobile-first design, SEO optimization, and more. Built with modern technologies."
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
              Comprehensive web development solutions tailored to your business
              needs. From concept to deployment, we've got you covered.
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
