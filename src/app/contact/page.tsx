'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  service: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'CAFMONZA12@GMAIL.COM',
    href: 'mailto:CAFMONZA12@GMAIL.COM',
  },
  {
    icon: Phone,
    title: 'Milano Lorenteggio',
    content: '+39 02 6146 0044',
    href: 'tel:+390261460044',
  },
  {
    icon: Phone,
    title: 'Milano Padova',
    content: '+39 02 3675 5609',
    href: 'tel:+390236755609',
  },
  {
    icon: Phone,
    title: 'Monza',
    content: '+39 039 598 6985',
    href: 'tel:+390395986985',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on selection change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log('📤 Submitting form data:', formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('📬 API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || "Errore durante l'invio");
      }

      // Success
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          address: '',
          service: '',
          message: '',
        });
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Errore durante l'invio. Riprova più tardi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contattaci - CafPotranto Servizi Legali"
        description="Contatta CafPotranto per servizi legali professionali e assistenza amministrativa. Siamo qui per aiutarti con tutte le tue esigenze legali."
        url="/contact"
      />

      {/* Empty div like homepage */}
      <div className="bg-light-teal max-auto text-cyan hidden px-4 md:block">
        .
      </div>

      {/* Hero Section */}
      <section className="bg-new-beige relative overflow-hidden py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="bg-dark-teal text-new-white inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                Contatti
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-new-navy mb-6 text-4xl font-bold tracking-tight lg:text-6xl"
            >
              Mettiti in{' '}
              <span className="from-dark-teal to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                Contatto
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-new-light-navy mb-10 text-lg lg:text-xl"
            >
              Hai bisogno di assistenza legale o supporto amministrativo? Siamo
              qui per aiutarti. Contattaci per servizi legali professionali e
              orientamento esperto.
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full"></div>
      </section>

      {/* Contact Section */}
      <section className="bg-new-navy py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-new-white mb-6 text-3xl font-bold tracking-tight">
                Iniziamo una{' '}
                <span className="text-new-beige">conversazione</span>
              </h2>
              <p className="text-new-dim-cyan mb-8 text-lg">
                Che tu abbia bisogno di assistenza per pratiche amministrative,
                servizi CAF, consulenza previdenziale o supporto per
                l'immigrazione, il nostro team di professionisti è qui per
                offrirti soluzioni personalizzate. Contattaci tramite uno dei
                canali indicati di seguito per ricevere assistenza qualificata.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="from-dark-teal to-light-teal flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-new-white mb-1 text-sm font-semibold tracking-wide uppercase">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={
                            info.title.includes('Sede') ? '_blank' : undefined
                          }
                          rel={
                            info.title.includes('Sede')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="text-new-dim-cyan hover:text-light-teal text-sm break-words transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-new-dim-cyan text-sm">
                          {info.content}
                        </p>
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
                className="bg-new-light-navy/30 border-new-dim-cyan/30 mt-8 rounded-lg border p-6"
              >
                <h3 className="text-new-beige mb-2 font-semibold">
                  Tempo di Risposta
                </h3>
                <p className="text-new-dim-cyan">
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
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/15">
                <div className="mb-8 text-center">
                  <div className="bg-dark-teal/90 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 shadow-xl backdrop-blur-sm">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-3 text-3xl font-bold text-white drop-shadow-lg">
                    Inviaci un <span className="text-cyan">Messaggio</span>
                  </h3>
                  <p className="text-lg font-medium text-white/80">
                    Compila il modulo e ti contatteremo al più presto
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4"
                  >
                    <p className="text-sm font-medium text-red-800">
                      ⚠️ {error}
                    </p>
                  </motion.div>
                )}

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-new-navy mb-2 text-lg font-semibold">
                      Messaggio Inviato!
                    </h4>
                    <p className="text-new-light-navy">
                      Grazie per averci contattato. Ti risponderemo presto.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nome e Email */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                        >
                          Nome Completo *
                        </Label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="focus:border-cyan focus:ring-cyan/50 h-14 w-full rounded-2xl border border-white/30 bg-white/20 px-5 py-4 font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 placeholder:text-white/60 hover:bg-white/25 focus:bg-white/25 focus:ring-2 focus:outline-none"
                            placeholder="Mario Rossi"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                        >
                          Indirizzo Email *
                        </Label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="focus:border-cyan focus:ring-cyan/50 h-14 w-full rounded-2xl border border-white/30 bg-white/20 px-5 py-4 font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 placeholder:text-white/60 hover:bg-white/25 focus:bg-white/25 focus:ring-2 focus:outline-none"
                            placeholder="mario.rossi@email.it"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Telefono */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                      >
                        Numero di Telefono *
                      </Label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="focus:border-cyan focus:ring-cyan/50 h-14 w-full rounded-2xl border border-white/30 bg-white/20 px-5 py-4 font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 placeholder:text-white/60 hover:bg-white/25 focus:bg-white/25 focus:ring-2 focus:outline-none"
                          placeholder="+39 123 456 7890"
                        />
                      </div>
                    </div>

                    {/* Sede da Contattare */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="location"
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                      >
                        Sede da Contattare *
                      </Label>
                      <div className="relative">
                        <Select
                          value={formData.location}
                          onValueChange={value =>
                            handleSelectChange('location', value)
                          }
                        >
                          <SelectTrigger className="text-new-navy focus:border-dark-teal focus:ring-dark-teal/50 h-14 w-full rounded-2xl border border-white/30 bg-white/90 px-5 py-4 font-medium shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white focus:bg-white focus:ring-2 focus:outline-none">
                            <SelectValue
                              placeholder="Seleziona una sede"
                              className="text-new-light-navy/70 font-medium"
                            />
                          </SelectTrigger>
                          <SelectContent className="border-dark-teal/30 rounded-2xl border bg-white shadow-2xl backdrop-blur-xl">
                            <SelectItem
                              value="sede-1"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              Sede 1 - Roma Centro
                            </SelectItem>
                            <SelectItem
                              value="sede-2"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              Sede 2 - Milano Nord
                            </SelectItem>
                            <SelectItem
                              value="sede-3"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              Sede 3 - Napoli
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Indirizzo */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="address"
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                      >
                        Indirizzo Completo *
                      </Label>
                      <div className="relative">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          className="focus:border-cyan focus:ring-cyan/50 h-14 w-full rounded-2xl border border-white/30 bg-white/20 px-5 py-4 font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 placeholder:text-white/60 hover:bg-white/25 focus:bg-white/25 focus:ring-2 focus:outline-none"
                          placeholder="Via Roma 123, 00100 Roma RM"
                        />
                      </div>
                    </div>

                    {/* Servizio Richiesto */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="service"
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                      >
                        Servizio Richiesto *
                      </Label>
                      <div className="relative">
                        <Select
                          value={formData.service}
                          onValueChange={value =>
                            handleSelectChange('service', value)
                          }
                        >
                          <SelectTrigger className="text-new-navy focus:border-dark-teal focus:ring-dark-teal/50 h-14 w-full rounded-2xl border border-white/30 bg-white/90 px-5 py-4 font-medium shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white focus:bg-white focus:ring-2 focus:outline-none">
                            <SelectValue
                              placeholder="Seleziona un servizio"
                              className="text-new-light-navy/70 font-medium"
                            />
                          </SelectTrigger>
                          <SelectContent className="border-dark-teal/30 rounded-2xl border bg-white shadow-2xl backdrop-blur-xl">
                            <SelectItem
                              value="caf-patronato"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              CAF e Patronato
                            </SelectItem>
                            <SelectItem
                              value="isee"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              ISEE
                            </SelectItem>
                            <SelectItem
                              value="spid"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              SPID
                            </SelectItem>
                            <SelectItem
                              value="naspi"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              NASpI
                            </SelectItem>
                            <SelectItem
                              value="immigrazione"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              Sportello Immigrazione
                            </SelectItem>
                            <SelectItem
                              value="pensioni"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              Pratiche Pensionistiche
                            </SelectItem>
                            <SelectItem
                              value="altro"
                              className="text-new-navy hover:bg-dark-teal/10 focus:bg-dark-teal/20 cursor-pointer rounded-lg font-medium transition-all duration-200"
                            >
                              Altro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Messaggio */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="message"
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                      >
                        Messaggio *
                      </Label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="focus:border-cyan focus:ring-cyan/50 w-full resize-none rounded-2xl border border-white/30 bg-white/20 px-5 py-4 font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 placeholder:text-white/60 hover:bg-white/25 focus:bg-white/25 focus:ring-2 focus:outline-none"
                          placeholder="Descrivi la tua richiesta in dettaglio..."
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-dark-teal hover:bg-dark-teal/90 active:bg-dark-teal/80 hover:shadow-3xl flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 px-8 py-5 text-lg font-bold text-white shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
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
                              className="mr-2 h-6 w-6 rounded-full border-3 border-current border-t-transparent"
                            />
                            Invio in corso...
                          </>
                        ) : (
                          <>
                            <Send className="h-6 w-6" />
                            Invia Messaggio
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="bg-new-navy/95 relative overflow-hidden py-16 backdrop-blur-xl lg:py-24">
        {/* Glassmorphism Background Elements */}
        <div className="bg-light-teal/10 absolute top-10 left-10 h-32 w-32 rounded-full backdrop-blur-sm"></div>
        <div className="bg-dark-teal/5 absolute right-20 bottom-20 h-40 w-40 rounded-full backdrop-blur-sm"></div>
        <div className="bg-light-teal/15 absolute top-1/2 left-1/3 h-24 w-24 rounded-full backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-8 lg:px-12">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <div className="bg-light-teal/20 border-light-teal/30 mb-6 inline-block rounded-full border px-6 py-3 backdrop-blur-md">
              <span className="text-sm font-bold tracking-wide text-white uppercase">
                Le Nostre Sedi
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
              Trova la sede a te più{' '}
              <span className="text-light-teal">vicina</span>
            </h2>
            <p className="text-xl leading-relaxed text-white/80">
              Contattaci per ricevere assistenza personalizzata: siamo sempre a
              tua disposizione
            </p>
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Milano Sede Legale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15">
                {/* Google Map */}
                <div className="mb-6 h-64 w-full overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.4966!2d9.1267!3d45.4570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c15f29e1e40f%3A0x1234567890abcdef!2sVia%20Lorenteggio%2C%20172%2C%2020147%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Milano Sede Legale - Via Lorenteggio 172"
                  />
                </div>

                {/* Location Info */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                    <h3 className="mb-2 text-xl font-bold text-white drop-shadow-sm">
                      MILANO SEDE LEGALE
                    </h3>
                    <p className="font-medium text-white/80">
                      Via LORENTEGGIO, 172 - MILANO 20147
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="tel:+390261460044"
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        02.61460044
                      </span>
                    </a>
                    <a
                      href="tel:+393495214147"
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        349.5214147
                      </span>
                    </a>
                    <a
                      href="mailto:CAFLORENTEGGIO@GMAIL.COM"
                      className="bg-yellow/20 hover:bg-yellow/30 border-yellow/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-yellow rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-yellow text-sm font-medium text-white transition-colors">
                        CAFLORENTEGGIO@GMAIL.COM
                      </span>
                    </a>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Via+Lorenteggio+172+Milano+20147+Italy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-3 font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/30"
                  >
                    <MapPin className="h-5 w-5" />
                    Ottieni Indicazioni
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Milano Via Padova */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15">
                {/* Google Map */}
                <div className="mb-6 h-64 w-full overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.8234!2d9.2267!3d45.5070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6f93e1e40f9%3A0x9876543210fedcba!2sVia%20Padova%2C%20288%2C%2020132%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Milano - Via Padova 288"
                  />
                </div>

                {/* Location Info */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                    <h3 className="mb-2 text-xl font-bold text-white drop-shadow-sm">
                      MILANO
                    </h3>
                    <p className="font-medium text-white/80">
                      Via PADOVA 288 - MILANO 20132
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="tel:0236755609"
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        02.36755609
                      </span>
                    </a>
                    <a
                      href="tel:3511721772"
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        351.1721772
                      </span>
                    </a>
                    <a
                      href="mailto:AZCAFPADOVA@GMAIL.COM"
                      className="bg-yellow/20 hover:bg-yellow/30 border-yellow/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-yellow rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-yellow text-sm font-medium text-white transition-colors">
                        AZCAFPADOVA@GMAIL.COM
                      </span>
                    </a>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Via+Padova+288+Milano+20132+Italy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-3 font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/30"
                  >
                    <MapPin className="h-5 w-5" />
                    Ottieni Indicazioni
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Monza */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="h-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15">
                {/* Google Map */}
                <div className="mb-6 h-64 w-full overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.5678!2d9.2734!3d45.5845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786b8f93e1e40f9%3A0xabcdef1234567890!2sVia%20Amati%2C%2012%2C%2020900%20Monza%20MB%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Monza - Via Amati 12/G"
                  />
                </div>

                {/* Location Info */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                    <h3 className="mb-2 text-xl font-bold text-white drop-shadow-sm">
                      MONZA
                    </h3>
                    <p className="font-medium text-white/80">
                      Via AMATI, 12/G - MONZA 20900
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="tel:0395986985"
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        039.5986985
                      </span>
                    </a>
                    <a
                      href="tel:3668735046"
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        366.8735046
                      </span>
                    </a>
                    <a
                      href="mailto:CAFMONZA12@GMAIL.COM"
                      className="bg-yellow/20 hover:bg-yellow/30 border-yellow/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-yellow rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-yellow text-sm font-medium text-white transition-colors">
                        CAFMONZA12@GMAIL.COM
                      </span>
                    </a>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Via+Amati+12+Monza+20900+Italy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-3 font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/30"
                  >
                    <MapPin className="h-5 w-5" />
                    Ottieni Indicazioni
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
