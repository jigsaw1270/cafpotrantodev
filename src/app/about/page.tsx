'use client';

import { motion } from 'framer-motion';
import { Award, Users, Target, Lightbulb } from 'lucide-react';
import { SEO } from '@/components/seo';

const values = [
  {
    icon: Target,
    title: 'Client-Focused',
    description:
      'We are committed to providing personalized legal services that address each client\'s unique needs and circumstances.',
  },
  {
    icon: Users,
    title: 'Professional',
    description:
      'Our experienced team provides reliable legal assistance with the highest standards of professionalism and confidentiality.',
  },
  {
    icon: Lightbulb,
    title: 'Expert Knowledge',
    description:
      'We stay current with evolving laws and regulations to provide accurate, up-to-date legal guidance.',
  },
  {
    icon: Award,
    title: 'Trusted Service',
    description:
      'We maintain the highest ethical standards and build lasting relationships based on trust and results.',
  },
];

const stats = [
  { label: 'Cases Handled', value: '500+' },
  { label: 'Satisfied Clients', value: '200+' },
  { label: 'Years Experience', value: '15+' },
  { label: 'Legal Specializations', value: '10+' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us - CafPotranto Legal Services"
        description="Learn about our mission, values, and the experienced legal team at CafPotranto. We're dedicated to providing exceptional legal services and administrative assistance."
        url="/about"
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
              About <span className="text-primary">Our Firm</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              We're a dedicated team of legal professionals committed to
              providing exceptional legal services and administrative assistance to our clients.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
                Our Heritage
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Established with a commitment to providing accessible and professional
                  legal services, CafPotranto has grown from a local practice into a
                  trusted legal partner for individuals and businesses across the region.
                </p>
                <p>
                  Our expertise encompasses CAF and Patronato services, labor law,
                  pension planning, and administrative procedures. We believe in
                  making complex legal processes simple and accessible for everyone.
                </p>
                <p>
                  Every client we serve receives personalized attention and expert
                  guidance, ensuring their legal needs are met with professionalism,
                  efficiency, and care.
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
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/40" />
              <div className="absolute inset-4 rounded-lg bg-card shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              The principles that guide everything we do and shape how we work
              with our clients and each other.
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
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              By the Numbers
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Our track record speaks for itself. Here's what we've accomplished
              together with our amazing clients.
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
                <div className="mb-2 text-4xl font-bold text-primary sm:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet the Team
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              The talented individuals who bring your digital visions to life
              with expertise, creativity, and passion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((member, index) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/40" />
                <h3 className="mb-1 text-lg font-semibold">Team Member {member}</h3>
                <p className="mb-2 text-sm text-primary">Senior Developer</p>
                <p className="text-sm text-muted-foreground">
                  Passionate about creating beautiful, functional, and
                  user-friendly applications.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
