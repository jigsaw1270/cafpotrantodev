'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  Phone,
  MessageCircle,
  Calculator,
  Shield,
  Smartphone,
  Gift,
  FileText,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import ServicePromiseMarquee from '@/components/ui/ServicePromiseMarquee';

const faqData = [
  {
    category: 'Servizi CAF',
    icon: Calculator,
    questions: [
      {
        id: 'caf-1',
        question: "Che cos'è il CAF e quali servizi offre?",
        answer:
          'Il CAF (Centro di Assistenza Fiscale) è un centro autorizzato che offre assistenza fiscale gratuita ai contribuenti. I nostri servizi includono: dichiarazione dei redditi (730 e Unico), calcolo ISEE, assistenza per bonus e agevolazioni fiscali, consulenza su detrazioni e deduzioni, e supporto per pratiche INPS.',
      },
      {
        id: 'caf-2',
        question: 'Quanto costa la dichiarazione dei redditi?',
        answer:
          'La dichiarazione dei redditi tramite CAF è completamente gratuita per i dipendenti e pensionati. Per i lavoratori autonomi e altri soggetti, potrebbero essere applicati dei costi che vi comunicheremo preventivamente durante la consulenza.',
      },
      {
        id: 'caf-3',
        question: 'Quali documenti servono per la dichiarazione dei redditi?',
        answer:
          "I documenti necessari includono: CU (ex CUD) del datore di lavoro, eventuali altri certificati di reddito, documentazione delle spese detraibili/deducibili (spese mediche, interessi mutuo, ristrutturazioni, ecc.), codice fiscale e documento d'identità. Vi forniremo un elenco dettagliato durante l'appuntamento.",
      },
      {
        id: 'caf-4',
        question: "Cos'è l'ISEE e quando serve?",
        answer:
          "L'ISEE (Indicatore della Situazione Economica Equivalente) è un documento che attesta la situazione economica del nucleo familiare. È necessario per accedere a prestazioni sociali agevolate, bonus, riduzioni universitarie, asili nido, mensa scolastica, e molti altri benefici.",
      },
    ],
  },
  {
    category: 'Servizi Patronato',
    icon: Shield,
    questions: [
      {
        id: 'patronato-1',
        question: 'Cosa fa il Patronato?',
        answer:
          'Il Patronato offre assistenza gratuita per le pratiche previdenziali e assistenziali. Ci occupiamo di pensioni, invalidità civile, assegni familiari, maternità, disoccupazione (NASpI), infortuni sul lavoro, ricorsi e contenziosi con INPS.',
      },
      {
        id: 'patronato-2',
        question: 'Come richiedere la pensione?',
        answer:
          "Per richiedere la pensione, occorre presentare domanda all'INPS almeno 3 mesi prima della data di decorrenza. Ci occupiamo noi di tutta la pratica: verifica dei requisiti, calcolo dell'importo, presentazione della domanda e follow-up. Il servizio è completamente gratuito.",
      },
      {
        id: 'patronato-3',
        question: "Cos'è la NASpI e chi può richiederla?",
        answer:
          "La NASpI (Nuova Assicurazione Sociale per l'Impiego) è l'indennità di disoccupazione per chi perde involontariamente il lavoro. Possono richiederla dipendenti, apprendisti, soci lavoratori di cooperative, personale artistico. La domanda va presentata entro 68 giorni dalla cessazione del rapporto di lavoro.",
      },
      {
        id: 'patronato-4',
        question: "Come si richiede l'invalidità civile?",
        answer:
          'La richiesta di invalidità civile prevede più fasi: visita del medico di base per il certificato introduttivo, presentazione domanda INPS online (che facciamo noi), visita della commissione medica, eventuale ricorso in caso di esito negativo. Vi assistiamo in tutto il processo.',
      },
    ],
  },
  {
    category: 'SPID e Servizi Digitali',
    icon: Smartphone,
    questions: [
      {
        id: 'spid-1',
        question: "Cos'è lo SPID e perché è importante?",
        answer:
          "SPID (Sistema Pubblico di Identità Digitale) è la chiave di accesso ai servizi online della Pubblica Amministrazione. È indispensabile per accedere al sito INPS, Agenzia delle Entrate, Comune, e molti altri servizi. Offriamo assistenza per la registrazione e l'attivazione.",
      },
      {
        id: 'spid-2',
        question: 'Come posso ottenere lo SPID?',
        answer:
          "Per ottenere SPID serve: maggiore età, documento d'identità valido, codice fiscale, numero di cellulare, email. Vi aiutiamo nella registrazione presso i provider autorizzati e nella verifica dell'identità, quando possibile anche presso il nostro ufficio.",
      },
      {
        id: 'spid-3',
        question: 'Ho problemi con lo SPID, cosa posso fare?',
        answer:
          "Se avete problemi di accesso, password dimenticata, o blocco dell'account SPID, possiamo assistervi nel ripristino. Offriamo anche supporto per l'utilizzo dei servizi online della PA tramite il vostro SPID.",
      },
    ],
  },
  {
    category: 'Bonus e Agevolazioni',
    icon: Gift,
    questions: [
      {
        id: 'bonus-1',
        question: 'Quali bonus posso richiedere nel 2025?',
        answer:
          'I principali bonus disponibili includono: Assegno Unico per i figli, bonus asilo nido, bonus bebè, agevolazioni per disabili, bonus ristrutturazioni, superbonus, ecobonus, bonus mobili. Vi informiamo sui requisiti e vi assistiamo nelle domande.',
      },
      {
        id: 'bonus-2',
        question: "Come richiedere l'Assegno Unico?",
        answer:
          "L'Assegno Unico si richiede online sul sito INPS con SPID, o tramite Contact Center, o presso il nostro Patronato. È necessario l'ISEE aggiornato per l'importo corretto. La domanda va rinnovata ogni anno e può essere presentata in qualsiasi momento.",
      },
      {
        id: 'bonus-3',
        question: 'Posso cumolare più bonus?',
        answer:
          'Dipende dai bonus specifici. Alcuni sono cumulabili, altri sono alternativi. Durante la consulenza verifichiamo la vostra situazione specifica e vi indichiamo la combinazione più vantaggiosa di agevolazioni per la vostra famiglia.',
      },
    ],
  },
  {
    category: 'Pratiche Generali',
    icon: FileText,
    questions: [
      {
        id: 'general-1',
        question: 'I vostri servizi sono gratuiti?',
        answer:
          'Sì, la maggior parte dei nostri servizi sono gratuiti: dichiarazioni dei redditi per dipendenti e pensionati, tutte le pratiche di Patronato, ISEE, assistenza per bonus. Per alcuni servizi specifici di consulenza professionale potrebbero essere applicati costi che comunicheremo sempre preventivamente.',
      },
      {
        id: 'general-2',
        question: 'Come posso prenotare un appuntamento?',
        answer:
          'Potete prenotare un appuntamento chiamandoci al numero di telefono, tramite WhatsApp, o compilando il form sul nostro sito web. Cerchiamo sempre di dare appuntamenti in tempi brevi e offriamo anche consulenze telefoniche per pratiche urgenti.',
      },
      {
        id: 'general-3',
        question: 'Posso venire senza appuntamento?',
        answer:
          'Preferiamo gli appuntamenti per garantirvi un servizio migliore e tempi di attesa ridotti. Tuttavia, per urgenze o informazioni rapide, potete passare negli orari di apertura e valuteremo la disponibilità per ricevervi.',
      },
      {
        id: 'general-4',
        question: 'Offrite consulenze online?',
        answer:
          'Sì, offriamo consulenze telefoniche e videochiamate per molte pratiche. Potete inviarci i documenti via email o WhatsApp (in modo sicuro) e organizzare una consulenza a distanza. Alcune pratiche richiedono comunque la presenza fisica.',
      },
    ],
  },
];

interface FAQItemProps {
  question: {
    id: string;
    question: string;
    answer: string;
  };
}

function FAQItem({ question }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-new-dim-cyan/20 group overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        className="group-hover:bg-new-beige/10 flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-new-navy font-family-general-sans pr-4 text-lg font-semibold">
          {question.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="text-dark-teal h-6 w-6" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="from-new-beige/5 to-light-teal/5 border-new-dim-cyan/20 border-t bg-gradient-to-r px-6 py-5">
              <p className="text-new-light-navy leading-relaxed">
                {question.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  // Basic FAQ data
  const basicFaq = [
    {
      question: 'Che cos’è il CAF e quali servizi offre?',
      answer:
        'Il CAF (Centro di Assistenza Fiscale) è un centro autorizzato che offre assistenza fiscale ai contribuenti. I nostri servizi includono: dichiarazione dei redditi (730 e Unico), calcolo ISEE, assistenza per bonus e agevolazioni fiscali, consulenza su detrazioni e deduzioni, e supporto per pratiche INPS.',
    },
    {
      question: 'Quanto costa la dichiarazione dei redditi?',
      answer:
        'La dichiarazione dei redditi tramite CAF per dipendenti, pensionati, lavoratori autonomi e altri soggetti prevede un costo. L’importo verrà comunicato preventivamente durante la consulenza.',
    },
    {
      question: 'Come richiedere la pensione?',
      answer:
        "Per richiedere la pensione, occorre presentare domanda all'INPS almeno 3 mesi prima della data di decorrenza. Ci occupiamo noi di tutta la pratica: verifica dei requisiti, calcolo dell'importo, presentazione della domanda e follow-up.",
    },
    {
      question: 'I vostri servizi sono gratuiti?',
      answer:
        'I nostri servizi non sono gratuiti: prevedono un costo che varia a seconda della pratica richiesta. L’importo verrà sempre comunicato preventivamente, in modo chiaro e trasparente, prima dell’avvio della consulenza o della lavorazione della pratica.',
    },
    {
      question: 'Offrite consulenza online?',
      answer:
        'Sì, offriamo consulenze telefoniche per diverse tipologie di pratiche. È possibile inviarci i documenti tramite email o WhatsApp in modo sicuro e organizzare una consulenza a distanza. Alcune pratiche, tuttavia, richiedono necessariamente la presenza fisica.',
    },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="FAQ - Domande Frequenti | CafPatronatoAZ"
        description="Trova risposte alle domande più frequenti sui nostri servizi CAF, Patronato, SPID, bonus e agevolazioni. Assistenza fiscale e previdenziale professionale."
        url="/faq"
      />

      {/* Empty div like homepage */}
      <div className="bg-light-teal max-auto text-cyan hidden px-4 md:block">
        .
      </div>

      {/* Hero Section */}
      <section
        className="bg-new-beige relative overflow-hidden bg-cover bg-center bg-no-repeat py-20 lg:py-12"
        style={{
          backgroundImage: 'url(/images/banner/beigebanner.svg)',
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="bg-dark-teal text-new-white mt-6 inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                Domande Frequenti
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-new-navy font-family-roundex mb-6 text-4xl font-bold tracking-tight text-shadow-md lg:text-6xl"
            >
              FAQ - Sezione{' '}
              <span className="from-dark-teal to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                Domande
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-10 text-lg text-gray-700 lg:text-xl"
            >
              In questa sezione trovi lerisposte alle domande più comuni sui
              nostriservizi CAF e Patronato, sui requisiti necessariper le
              pratiche e sulle principali agevolazionidisponibili. Il nostro
              obiettivo è fornirtiinformazioni chiare e immediate per aiutarti
              aorientarti tra procedure e documentazioni. Senon trovi ciò che
              cerchi, non esitare acontattarci direttamente: il nostro team è a
              tuadisposizione per offrirti supportopersonalizzato e cortese
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full"></div>
      </section>

      {/* Service Promise Marquee */}
      <ServicePromiseMarquee />

      {/* FAQ Content */}
      <section className="bg-white-zigzag3d py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-5xl">
            {/* --- Basic FAQ Section --- */}
            <div className="mb-16">
              <div className="mb-12 text-center">
                <h2 className="text-new-navy font-family-general-sans text-3xl font-bold tracking-tight lg:text-4xl">
                  Domande frequenti di base
                </h2>
                <div className="from-dark-teal to-light-teal mx-auto h-1 w-1/2 rounded-full bg-gradient-to-r"></div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {basicFaq.map((item, idx) => (
                  <motion.div
                    key={item.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-full"
                  >
                    <div className="border-new-dim-cyan/20 group w-full overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                      <button
                        className="group-hover:bg-new-beige/10 flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300"
                        onClick={() =>
                          setOpenIndex(openIndex === idx ? null : idx)
                        }
                        aria-expanded={openIndex === idx}
                      >
                        <h3 className="text-new-navy font-family-general-sans w-full pr-4 text-lg font-semibold">
                          {item.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openIndex === idx ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="text-dark-teal h-6 w-6" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="from-new-beige/5 to-light-teal/5 border-new-dim-cyan/20 border-t bg-gradient-to-r px-6 py-5">
                              <p className="text-new-light-navy leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* --- END Basic FAQ Section --- */}

            {/* --- COMMENTED OUT: Previous FAQ Sections --- */}
            {/*
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="mb-12 text-center">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <div className="from-dark-teal to-light-teal flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-new-navy font-family-general-sans text-3xl font-bold tracking-tight lg:text-4xl">
                      {category.category.split(' ')[0]}{' '}
                      <span className="from-dark-teal to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                        {category.category.split(' ').slice(1).join(' ')}
                      </span>
                    </h2>
                  </div>
                  <div className="from-dark-teal to-light-teal mx-auto h-1 w-24 rounded-full bg-gradient-to-r"></div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {category.questions.map((question, questionIndex) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: questionIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FAQItem question={question} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
            */}
          </div>
        </div>
      </section>

      {/* Support Statistics Section */}
      <section className="bg-new-navy relative overflow-hidden py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-new-white font-family-general-sans mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
              Il Nostro{' '}
              <span className="from-new-beige to-light-teal bg-gradient-to-r bg-clip-text text-transparent">
                Supporto
              </span>{' '}
              in Numeri
            </h2>
            <p className="text-new-dim-cyan mx-auto max-w-2xl text-lg">
              Ogni giorno aiutiamo centinaia di persone a risolvere le loro
              pratiche amministrative e fiscali con professionalità e
              competenza.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="from-dark-teal/20 to-light-teal/40 border-new-beige/20 hover:border-new-beige/40 rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300 hover:scale-105">
                <div className="text-new-beige mb-2 text-4xl font-bold lg:text-5xl">
                  CAF
                </div>
                <div className="text-new-white mb-2 text-lg font-semibold">
                  Servizi Fiscali
                </div>
                <div className="text-new-dim-cyan text-sm">
                  Assistenza completa
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="from-light-teal/20 to-dark-teal/40 border-light-teal/20 hover:border-light-teal/40 rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300 hover:scale-105">
                <div className="text-light-teal mb-2 text-4xl font-bold lg:text-5xl">
                  SPID
                </div>
                <div className="text-new-white mb-2 text-lg font-semibold">
                  Identità Digitale
                </div>
                <div className="text-new-dim-cyan text-sm">
                  Attivazione e supporto
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="from-new-beige/20 to-dark-teal/40 border-new-beige/20 hover:border-new-beige/40 rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300 hover:scale-105">
                <div className="text-new-beige mb-2 text-4xl font-bold lg:text-5xl">
                  24/7
                </div>
                <div className="text-new-white mb-2 text-lg font-semibold">
                  Accessibilità
                </div>
                <div className="text-new-dim-cyan text-sm">
                  FAQ sempre disponibili
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="from-dark-teal/20 to-new-beige/40 border-dark-teal/20 hover:border-dark-teal/40 rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300 hover:scale-105">
                <div className="text-dark-teal mb-2 text-4xl font-bold lg:text-5xl">
                  Gratuiti
                </div>
                <div className="text-new-white mb-2 text-lg font-semibold">
                  Molti servizi
                </div>
                <div className="text-new-dim-cyan text-sm">
                  Senza alcun costo aggiuntivo
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Help Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-new-white font-family-general-sans mb-10 text-center text-2xl font-bold">
              I Nostri{' '}
              <span className="text-light-teal">Servizi Principali</span>
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-new-light-navy/30 border-new-dim-cyan/30 hover:border-light-teal/50 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300">
                <div className="from-dark-teal to-light-teal mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-new-white mb-2 text-center font-semibold">
                  Assistenza CAF
                </h4>
                <p className="text-new-dim-cyan text-center text-sm">
                  Dichiarazioni redditi, ISEE e pratiche fiscali
                </p>
              </div>

              <div className="bg-new-light-navy/30 border-new-dim-cyan/30 hover:border-light-teal/50 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300">
                <div className="from-light-teal to-dark-teal mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-new-white mb-2 text-center font-semibold">
                  Servizi Patronato
                </h4>
                <p className="text-new-dim-cyan text-center text-sm">
                  Pensioni, NASpI e pratiche previdenziali
                </p>
              </div>

              <div className="bg-new-light-navy/30 border-new-dim-cyan/30 hover:border-light-teal/50 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300">
                <div className="from-new-beige to-dark-teal mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-new-white mb-2 text-center font-semibold">
                  Consulenza Legale
                </h4>
                <p className="text-new-dim-cyan text-center text-sm">
                  Supporto amministrativo e documentale
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-light-teal/10 absolute -top-20 -right-20 h-40 w-40 rounded-full"></div>
        <div className="bg-dark-teal/10 absolute -bottom-20 -left-20 h-32 w-32 rounded-full"></div>
      </section>
    </>
  );
}
