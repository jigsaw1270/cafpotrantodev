'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'info@cafpotranto.it',
    href: 'mailto:info@cafpotranto.it',
  },
  {
    icon: Phone,
    title: 'Telefono',
    content: '+39 06 1234 5678',
    href: 'tel:+390612345678',
  },
  {
    icon: MapPin,
    title: 'Ubicazione',
    content: 'Roma, Italia',
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <>
      <SEO
        title="Contattaci - CafPotranto Servizi Legali"
        description="Contatta CafPotranto per servizi legali professionali e assistenza amministrativa. Siamo qui per aiutarti con tutte le tue esigenze legali."
        url="/contact"
      />

      {/* Empty div like homepage */}
      <div className="bg-cyan max-auto text-cyan hidden px-4 md:block">.</div>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-linear-to-bl bg-gradient-to-br py-10"
        style={{
          background:
            'linear-gradient(342deg,rgba(201, 95, 42, 1) 0%, rgba(229, 104, 41, 1) 6%, rgba(234, 113, 51, 1) 20%, rgba(240, 123, 63, 1) 33%, rgba(255, 212, 96, 1) 100%)',
        }}
      >
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-background mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Mettiti <span className="text-primary">in contatto</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-8 text-xl"
            >
              Hai bisogno di assistenza legale o supporto amministrativo? Siamo
              qui per aiutarti. Contattaci per servizi legali professionali e
              orientamento esperto.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="grad-up-navy py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-background mb-6 text-3xl font-bold tracking-tight">
                Iniziamo una conversazione
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Che tu abbia un progetto specifico in mente o voglia
                semplicemente esplorare diverse possibilità, siamo qui per
                aiutarti. Contattaci tramite uno dei canali indicati di seguito.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                      <info.icon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-background font-semibold">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card mt-8 rounded-lg border p-6"
              >
                <h3 className="mb-2 font-semibold text-white">Response Time</h3>
                <p className="text-white">
                  Di solito rispondiamo entro 24 ore durante i giorni
                  lavorativi. Per richieste urgenti, ti preghiamo di chiamarci
                  direttamente.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div
                className="rounded-lg border p-8 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #c3e6ec, #a7d1d9)',
                }}
              >
                <h3 className="text-background mb-6 text-2xl font-bold">
                  Inviaci un Messaggio
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-background mb-2 text-lg font-semibold">
                      Message Sent!
                    </h4>
                    <p className="text-muted-foreground">
                      Grazie per averci contattato. Ti risponderemo presto.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-background block text-sm font-medium"
                        >
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-input bg-background text-forground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                          placeholder="Il tuo nome"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-background block text-sm font-medium"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-input bg-background text-forground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-background block text-sm font-medium"
                      >
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-input bg-background text-forground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                        placeholder="Il tuo numero di telefono"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="text-background block text-sm font-medium"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="border-input bg-background text-forground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                        placeholder="Project inquiry"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-background block text-sm font-medium"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-input bg-background text-forground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                          />
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Invia Messaggio
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
