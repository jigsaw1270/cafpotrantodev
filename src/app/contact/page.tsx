'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Pattern from '@/components/ui/pattern-background';
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
      <div className="bg-cyan max-auto text-cyan hidden px-4 md:block">.</div>

      {/* Hero Section */}
      <section className="bg-purple relative overflow-hidden bg-linear-to-bl py-10">
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
              className="text-background mb-8 text-xl"
            >
              Hai bisogno di assistenza legale o supporto amministrativo? Siamo
              qui per aiutarti. Contattaci per servizi legali professionali e
              orientamento esperto.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Pattern Background */}
        <div className="absolute inset-0 z-0">
          <Pattern />
        </div>

        <div className="relative z-10 container mx-auto px-8 lg:px-12">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trova la sede a te più vicina e contattaci per ricevere assistenza
              personalizzata: siamo sempre a tua disposizione
            </h2>
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Milano Sede Legale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="from-cyan/20 to-navy-gradient-1/20 mb-6 h-48 overflow-hidden rounded-lg bg-gradient-to-br">
                <div className="flex h-full items-center justify-center text-gray-400">
                  <MapPin className="h-16 w-16" />
                </div>
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-navy-dark mb-2 text-xl font-bold">
                    MILANO SEDE LEGALE
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    Via LORENTEGGIO, 172 - MILANO 20147
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-cyan h-4 w-4" />
                    <a
                      href="tel:0261460044"
                      className="hover:text-cyan text-gray-700 transition-colors"
                    >
                      02.61460044
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-cyan h-4 w-4" />
                    <a
                      href="tel:3512613000"
                      className="hover:text-cyan text-gray-700 transition-colors"
                    >
                      351.2613000
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="text-cyan h-4 w-4" />
                    <a
                      href="mailto:CAFLORENTEGGIO@GMAIL.COM"
                      className="hover:text-cyan break-all text-gray-700 transition-colors"
                    >
                      CAFLORENTEGGIO@GMAIL.COM
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Milano Via Padova */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="from-cyan/20 to-navy-gradient-1/20 mb-6 h-48 overflow-hidden rounded-lg bg-gradient-to-br">
                <div className="flex h-full items-center justify-center text-gray-400">
                  <MapPin className="h-16 w-16" />
                </div>
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-navy-dark mb-2 text-xl font-bold">
                    MILANO
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    Via PADOVA 288 - MILANO 20132
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-cyan h-4 w-4" />
                    <a
                      href="tel:0236755609"
                      className="hover:text-cyan text-gray-700 transition-colors"
                    >
                      02.36755609
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-cyan h-4 w-4" />
                    <a
                      href="tel:3511721772"
                      className="hover:text-cyan text-gray-700 transition-colors"
                    >
                      351.1721772
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="text-cyan h-4 w-4" />
                    <a
                      href="mailto:AZCAFPADOVA@GMAIL.COM"
                      className="hover:text-cyan break-all text-gray-700 transition-colors"
                    >
                      AZCAFPADOVA@GMAIL.COM
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Monza */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="from-cyan/20 to-navy-gradient-1/20 mb-6 h-48 overflow-hidden rounded-lg bg-gradient-to-br">
                <div className="flex h-full items-center justify-center text-gray-400">
                  <MapPin className="h-16 w-16" />
                </div>
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-navy-dark mb-2 text-xl font-bold">
                    MONZA
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    Via AMATI, 12/G - MONZA 20900
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-cyan h-4 w-4" />
                    <a
                      href="tel:0395986985"
                      className="hover:text-cyan text-gray-700 transition-colors"
                    >
                      039.5986985
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-cyan h-4 w-4" />
                    <a
                      href="tel:3668735046"
                      className="hover:text-cyan text-gray-700 transition-colors"
                    >
                      366.8735046
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="text-cyan h-4 w-4" />
                    <a
                      href="mailto:CAFMONZA12@GMAIL.COM"
                      className="hover:text-cyan break-all text-gray-700 transition-colors"
                    >
                      CAFMONZA12@GMAIL.COM
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
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
                    <h4 className="text-background mb-2 text-lg font-semibold">
                      Messaggio Inviato!
                    </h4>
                    <p className="text-muted-foreground">
                      Grazie per averci contattato. Ti risponderemo presto.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nome e Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-navy-dark font-semibold"
                        >
                          Nome Completo *
                        </Label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="focus:border-cyan focus:ring-cyan/20 flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Mario Rossi"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-navy-dark font-semibold"
                        >
                          Indirizzo Email *
                        </Label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="focus:border-cyan focus:ring-cyan/20 flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="mario.rossi@email.it"
                        />
                      </div>
                    </div>

                    {/* Telefono */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-navy-dark font-semibold"
                      >
                        Numero di Telefono *
                      </Label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="focus:border-cyan focus:ring-cyan/20 flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="+39 123 456 7890"
                      />
                    </div>

                    {/* Sede da Contattare */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="text-navy-dark font-semibold"
                      >
                        Sede da Contattare *
                      </Label>
                      <Select
                        value={formData.location}
                        onValueChange={value =>
                          handleSelectChange('location', value)
                        }
                      >
                        <SelectTrigger className="focus:border-cyan focus:ring-cyan/20 h-11 border-gray-300 bg-white text-gray-900">
                          <SelectValue placeholder="Seleziona una sede" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900">
                          <SelectItem
                            value="sede-1"
                            className="hover:bg-purple cursor-pointer"
                          >
                            Sede 1 - Roma Centro
                          </SelectItem>
                          <SelectItem
                            value="sede-2"
                            className="hover:bg-purple cursor-pointer"
                          >
                            Sede 2 - Milano Nord
                          </SelectItem>
                          <SelectItem
                            value="sede-3"
                            className="hover:bg-purple cursor-pointer"
                          >
                            Sede 3 - Napoli
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Indirizzo */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-navy-dark font-semibold"
                      >
                        Indirizzo Completo *
                      </Label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="focus:border-cyan focus:ring-cyan/20 flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Via Roma 123, 00100 Roma RM"
                      />
                    </div>

                    {/* Servizio Richiesto */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="service"
                        className="text-navy-dark font-semibold"
                      >
                        Servizio Richiesto *
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={value =>
                          handleSelectChange('service', value)
                        }
                      >
                        <SelectTrigger className="focus:border-cyan focus:ring-cyan/20 h-11 border-gray-300 bg-white text-gray-900">
                          <SelectValue placeholder="Seleziona un servizio" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900">
                          <SelectItem
                            value="caf-patronato"
                            className="hover:bg-purple cursor-pointer"
                          >
                            CAF e Patronato
                          </SelectItem>
                          <SelectItem
                            value="isee"
                            className="hover:bg-purple cursor-pointer"
                          >
                            ISEE
                          </SelectItem>
                          <SelectItem
                            value="spid"
                            className="hover:bg-purple cursor-pointer"
                          >
                            SPID
                          </SelectItem>
                          <SelectItem
                            value="naspi"
                            className="hover:bg-purple cursor-pointer"
                          >
                            NASpI
                          </SelectItem>
                          <SelectItem
                            value="immigrazione"
                            className="hover:bg-purple cursor-pointer"
                          >
                            Sportello Immigrazione
                          </SelectItem>
                          <SelectItem
                            value="pensioni"
                            className="hover:bg-purple cursor-pointer"
                          >
                            Pratiche Pensionistiche
                          </SelectItem>
                          <SelectItem
                            value="altro"
                            className="hover:bg-purple cursor-pointer"
                          >
                            Altro
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Messaggio */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-navy-dark font-semibold"
                      >
                        Messaggio *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="focus:border-cyan focus:ring-cyan/20 flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Descrivi la tua richiesta..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="from-cyan to-navy-gradient-1 hover:from-cyan/90 hover:to-navy-gradient-1/90 w-full bg-gradient-to-r text-white"
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
