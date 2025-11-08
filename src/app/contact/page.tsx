'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Label } from '@/components/ui/label';
import { openWhatsApp } from '@/lib/whatsapp';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'CAFMONZA12@GMAIL.COM',
    type: 'email' as const,
    href: 'mailto:CAFMONZA12@GMAIL.COM',
  },
  {
    icon: Phone,
    title: 'Milano Lorenteggio',
    content: '+39 02 6146 0044',
    type: 'phone' as const,
    phone: '0261460044',
  },
  {
    icon: Phone,
    title: 'Milano Padova',
    content: '+39 02 3675 5609',
    type: 'phone' as const,
    phone: '0236755609',
  },
  {
    icon: MessageCircle,
    title: 'CAF Monza',
    content: '+39 366 8735 046',
    type: 'phone' as const,
    phone: '3668735046',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate location value on change (simpler approach)
  useEffect(() => {
    const validLocationValues = [
      'milano-lorenteggio',
      'milano-padova',
      'monza',
    ];
    if (formData.location && !validLocationValues.includes(formData.location)) {
      console.log('🌐 Invalid location detected, clearing value');
      setFormData(prev => ({ ...prev, location: '' }));
    }
  }, [formData.location]);

  // Handle WhatsApp call action
  const handleWhatsAppCall = (phone: string, title: string) => {
    // Clean and format phone number for WhatsApp
    let cleanPhone = phone.replace(/\D/g, ''); // Remove all non-digits

    // Ensure Italian country code is present
    if (!cleanPhone.startsWith('39')) {
      // Italian numbers: landlines start with 0, mobiles start with 3
      if (cleanPhone.startsWith('0') || cleanPhone.startsWith('3')) {
        cleanPhone = '39' + cleanPhone;
      } else {
        // Fallback: just add 39
        cleanPhone = '39' + cleanPhone;
      }
    }

    console.log(`📞 Original phone: ${phone} -> WhatsApp phone: ${cleanPhone}`);

    const message = `Ciao! 👋\n\nVorrei contattare la sede: *${title}*\n\nPotete aiutarmi?\n\nGrazie! 🙏`;

    openWhatsApp({
      phone: cleanPhone,
      message: message,
    });
  };

  // Handle email action - detect mobile vs desktop and open appropriate email service
  const handleEmailClick = (email: string) => {
    const subject = encodeURIComponent('Richiesta informazioni - CafPotranto');
    const body = encodeURIComponent(
      'Buongiorno,\n\nVorrei ricevere informazioni sui vostri servizi.\n\nGrazie'
    );

    // Detect if we're on mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile devices, try different email app approaches
      if (isAndroid) {
        // Try Gmail app on Android first
        try {
          const gmailUrl = `googlegmail://co?to=${email}&subject=${subject}&body=${body}`;
          window.location.href = gmailUrl;
        } catch {
          // Fallback to mailto
          const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
          window.location.href = mailtoUrl;
        }
      } else if (isIOS) {
        // On iOS, use mailto which opens the default mail app
        const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
      } else {
        // Other mobile devices
        const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
      }
    } else {
      // On desktop/web browser, open Gmail in browser
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&subject=${subject}&body=${body}`;
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log('📍 Location selected:', { name, value });

    // Validate that the selected value is one of our expected values
    const validLocationValues = [
      'milano-lorenteggio',
      'milano-padova',
      'monza',
    ];

    if (name === 'location' && value && !validLocationValues.includes(value)) {
      console.warn('⚠️ Invalid location value selected:', value);
      setError('Valore della sede non valido. Riprova a selezionare una sede.');
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on valid selection
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log('📤 Submitting form data:', formData);

    try {
      // Add encoding safety for form data
      const safeFormData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        address: formData.address.trim(),
        message: formData.message.trim(),
      };

      // Validate location before submission
      const validLocationValues = [
        'milano-lorenteggio',
        'milano-padova',
        'monza',
      ];
      if (!validLocationValues.includes(safeFormData.location)) {
        throw new Error(
          'Please select a valid office location. If using translation, try switching to Italian first.'
        );
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(safeFormData),
      });

      if (!response.ok) {
        // Handle different HTTP error codes
        if (response.status === 429) {
          throw new Error('Troppe richieste. Riprova tra qualche minuto.');
        } else if (response.status >= 500) {
          throw new Error('Errore del server. Riprova più tardi.');
        } else if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Dati non validi.');
        } else {
          throw new Error(
            'Errore di connessione. Verifica la tua connessione internet.'
          );
        }
      }

      const data = await response.json();
      console.log('📬 API Response:', data);

      if (!data.success) {
        throw new Error(data.message || "Errore durante l'invio");
      }

      // Success - use stable state updates
      setTimeout(() => {
        setIsSubmitted(true);
      }, 100);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            location: '',
            address: '',
            message: '',
          });
        }, 100);
      }, 5000);
    } catch (err) {
      console.error('Form submission error:', err);

      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(
          'Errore di connessione. Verifica la tua connessione internet e riprova.'
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Errore durante l'invio. Riprova più tardi."
        );
      }
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
      <section className="bg-new-beige relative overflow-hidden py-20 lg:py-12">
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
              className="text-new-navy font-family-roundex mb-6 text-4xl font-bold tracking-tight text-shadow-md lg:text-6xl"
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
              <h2 className="text-new-white font-family-general-sans mb-6 text-3xl font-bold tracking-tight">
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
                    className="flex cursor-pointer items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                    onClick={() => {
                      if (info.type === 'phone' && info.phone) {
                        handleWhatsAppCall(info.phone, info.title);
                      } else if (info.type === 'email') {
                        handleEmailClick(info.content);
                      }
                    }}
                  >
                    <div className="from-dark-teal to-light-teal flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-new-white mb-1 text-sm font-semibold tracking-wide uppercase">
                        {info.title}
                      </h3>
                      <p className="text-new-dim-cyan text-sm break-words">
                        {info.content}
                      </p>
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
              <div
                key="contact-form-container"
                className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
              >
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
                    {error.includes('sede') && (
                      <p className="mt-2 text-xs text-red-600">
                        💡 If you're using translation: please try switching
                        back to Italian, select the office, then translate
                        again.
                      </p>
                    )}
                  </motion.div>
                )}

                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-new-navy mb-2 text-lg font-semibold">
                      Messaggio Inviato!
                    </h4>
                    <p className="text-new-light-navy">
                      Grazie per averci contattato. Ti risponderemo presto.
                    </p>
                  </div>
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
                    <div className="space-y-3" key="location-field">
                      <Label
                        htmlFor="location"
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm"
                      >
                        <span>Sede da Contattare</span> /{' '}
                        <span>Office to Contact</span> *
                      </Label>
                      <div className="relative">
                        {/* Simple native HTML select - immune to Google Translate interference */}
                        <select
                          value={formData.location}
                          onChange={e =>
                            handleSelectChange('location', e.target.value)
                          }
                          className="text-new-navy focus:border-dark-teal focus:ring-dark-teal/50 h-14 w-full appearance-none rounded-2xl border border-white/30 bg-white/90 bg-right bg-no-repeat px-5 py-4 pr-10 font-medium shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white focus:bg-white focus:ring-2 focus:outline-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundSize: '1.5em 1.5em',
                          }}
                          required
                        >
                          <option value="" disabled>
                            {/* Show bilingual placeholder */}
                            Select an office / Seleziona una sede
                          </option>
                          <option value="milano-lorenteggio">
                            Milano Lorenteggio - Via Lorenteggio 172
                          </option>
                          <option value="milano-padova">
                            Milano Padova - Via Padova 288
                          </option>
                          <option value="monza">Monza - Via Amati 12/G</option>
                        </select>
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
                            <div className="mr-2 h-6 w-6 animate-spin rounded-full border-3 border-current border-t-transparent" />
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
            <h2 className="font-family-general-sans mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
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
                    <div
                      onClick={() =>
                        handleWhatsAppCall('0261460044', 'MILANO SEDE LEGALE')
                      }
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        02.61460044
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        handleWhatsAppCall('3495214147', 'MILANO SEDE LEGALE')
                      }
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        349.5214147
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        handleEmailClick('CAFLORENTEGGIO@GMAIL.COM')
                      }
                      className="bg-yellow/20 hover:bg-yellow/30 border-yellow/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-yellow rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-yellow text-sm font-medium text-white transition-colors">
                        CAFLORENTEGGIO@GMAIL.COM
                      </span>
                    </div>
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
                    <div
                      onClick={() =>
                        handleWhatsAppCall('0236755609', 'MILANO - Via Padova')
                      }
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        02.36755609
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        handleWhatsAppCall('3511721772', 'MILANO - Via Padova')
                      }
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        351.1721772
                      </span>
                    </div>
                    <div
                      onClick={() => handleEmailClick('AZCAFPADOVA@GMAIL.COM')}
                      className="bg-yellow/20 hover:bg-yellow/30 border-yellow/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-yellow rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-yellow text-sm font-medium text-white transition-colors">
                        AZCAFPADOVA@GMAIL.COM
                      </span>
                    </div>
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
                    <div
                      onClick={() =>
                        handleWhatsAppCall('0395986985', 'MONZA - Via Amati')
                      }
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        039.5986985
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        handleWhatsAppCall('3668735046', 'MONZA - Via Amati')
                      }
                      className="bg-light-teal/20 hover:bg-light-teal/30 border-light-teal/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-light-teal rounded-full p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-light-teal font-medium text-white transition-colors">
                        366.8735046
                      </span>
                    </div>
                    <div
                      onClick={() => handleEmailClick('CAFMONZA12@GMAIL.COM')}
                      className="bg-yellow/20 hover:bg-yellow/30 border-yellow/30 group flex cursor-pointer items-center gap-3 rounded-xl border p-3 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-yellow rounded-full p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-yellow text-sm font-medium text-white transition-colors">
                        CAFMONZA12@GMAIL.COM
                      </span>
                    </div>
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
