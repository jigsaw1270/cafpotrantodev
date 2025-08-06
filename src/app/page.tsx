'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Rocket, Users } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/seo';

const features = [
  {
    icon: Code,
    title: 'Modern Development',
    description:
      'Built with the latest technologies including React, Next.js, and TypeScript.',
  },
  {
    icon: Rocket,
    title: 'Performance Optimized',
    description:
      'Fast loading times and optimized for search engines and user experience.',
  },
  {
    icon: Users,
    title: 'User-Centered Design',
    description:
      'Designed with accessibility and user experience at the forefront.',
  },
];

const benefits = [
  'Responsive design for all devices',
  'SEO optimized for better visibility',
  'Modern development practices',
  'Professional support and maintenance',
];

export default function Home() {
  return (
    <>
      <SEO
        title="CafPotranto Dev - Modern Web Development"
        description="Professional web development services with modern technologies. Specializing in React, Next.js, and TypeScript applications."
        url="/"
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
              Modern Web Development
              <span className="text-primary"> Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              We build exceptional digital experiences with cutting-edge
              technologies. From concept to deployment, we deliver professional
              web applications that drive results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <CTAButton size="lg" className="text-lg">
                Get Started
              </CTAButton>
              <Button variant="outline" size="lg" className="text-lg">
                View Our Work
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
              We combine technical expertise with creative vision to deliver
              outstanding results.
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
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let's discuss your project and bring your vision to life with our
              expert development team.
            </p>
            <CTAButton size="lg" className="text-lg">
              Contact Us Today
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
