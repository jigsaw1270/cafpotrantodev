'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
        location: '',
        address: '',
        service: '',
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
                    {/* <div className="space-y-2">
                      <Label htmlFor="service" className="text-navy-dark font-semibold">
                        Servizio Richiesto *
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => handleSelectChange('service', value)}
                      >
                        <SelectTrigger className="h-11 border-gray-300 bg-white text-gray-900 focus:border-cyan focus:ring-cyan/20">
                          <SelectValue placeholder="Seleziona un servizio" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="caf-patronato" className="cursor-pointer hover:bg-cyan/10">
                            CAF e Patronato
                          </SelectItem>
                          <SelectItem value="isee" className="cursor-pointer hover:bg-cyan/10">
                            ISEE
                          </SelectItem>
                          <SelectItem value="spid" className="cursor-pointer hover:bg-cyan/10">
                            SPID
                          </SelectItem>
                          <SelectItem value="naspi" className="cursor-pointer hover:bg-cyan/10">
                            NASpI
                          </SelectItem>
                          <SelectItem value="immigrazione" className="cursor-pointer hover:bg-cyan/10">
                            Sportello Immigrazione
                          </SelectItem>
                          <SelectItem value="pensioni" className="cursor-pointer hover:bg-cyan/10">
                            Pratiche Pensionistiche
                          </SelectItem>
                          <SelectItem value="altro" className="cursor-pointer hover:bg-cyan/10">
                            Altro
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}

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
