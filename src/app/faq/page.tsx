'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    category: "Servizi CAF",
    questions: [
      {
        id: "caf-1",
        question: "Che cos'è il CAF e quali servizi offre?",
        answer: "Il CAF (Centro di Assistenza Fiscale) è un centro autorizzato che offre assistenza fiscale gratuita ai contribuenti. I nostri servizi includono: dichiarazione dei redditi (730 e Unico), calcolo ISEE, assistenza per bonus e agevolazioni fiscali, consulenza su detrazioni e deduzioni, e supporto per pratiche INPS."
      },
      {
        id: "caf-2",
        question: "Quanto costa la dichiarazione dei redditi?",
        answer: "La dichiarazione dei redditi tramite CAF è completamente gratuita per i dipendenti e pensionati. Per i lavoratori autonomi e altri soggetti, potrebbero essere applicati dei costi che vi comunicheremo preventivamente durante la consulenza."
      },
      {
        id: "caf-3",
        question: "Quali documenti servono per la dichiarazione dei redditi?",
        answer: "I documenti necessari includono: CU (ex CUD) del datore di lavoro, eventuali altri certificati di reddito, documentazione delle spese detraibili/deducibili (spese mediche, interessi mutuo, ristrutturazioni, ecc.), codice fiscale e documento d'identità. Vi forniremo un elenco dettagliato durante l'appuntamento."
      },
      {
        id: "caf-4",
        question: "Cos'è l'ISEE e quando serve?",
        answer: "L'ISEE (Indicatore della Situazione Economica Equivalente) è un documento che attesta la situazione economica del nucleo familiare. È necessario per accedere a prestazioni sociali agevolate, bonus, riduzioni universitarie, asili nido, mensa scolastica, e molti altri benefici."
      }
    ]
  },
  {
    category: "Servizi Patronato",
    questions: [
      {
        id: "patronato-1",
        question: "Cosa fa il Patronato?",
        answer: "Il Patronato offre assistenza gratuita per le pratiche previdenziali e assistenziali. Ci occupiamo di pensioni, invalidità civile, assegni familiari, maternità, disoccupazione (NASpI), infortuni sul lavoro, ricorsi e contenziosi con INPS."
      },
      {
        id: "patronato-2",
        question: "Come richiedere la pensione?",
        answer: "Per richiedere la pensione, occorre presentare domanda all'INPS almeno 3 mesi prima della data di decorrenza. Ci occupiamo noi di tutta la pratica: verifica dei requisiti, calcolo dell'importo, presentazione della domanda e follow-up. Il servizio è completamente gratuito."
      },
      {
        id: "patronato-3",
        question: "Cos'è la NASpI e chi può richiederla?",
        answer: "La NASpI (Nuova Assicurazione Sociale per l'Impiego) è l'indennità di disoccupazione per chi perde involontariamente il lavoro. Possono richiederla dipendenti, apprendisti, soci lavoratori di cooperative, personale artistico. La domanda va presentata entro 68 giorni dalla cessazione del rapporto di lavoro."
      },
      {
        id: "patronato-4",
        question: "Come si richiede l'invalidità civile?",
        answer: "La richiesta di invalidità civile prevede più fasi: visita del medico di base per il certificato introduttivo, presentazione domanda INPS online (che facciamo noi), visita della commissione medica, eventuale ricorso in caso di esito negativo. Vi assistiamo in tutto il processo."
      }
    ]
  },
  {
    category: "SPID e Servizi Digitali",
    questions: [
      {
        id: "spid-1",
        question: "Cos'è lo SPID e perché è importante?",
        answer: "SPID (Sistema Pubblico di Identità Digitale) è la chiave di accesso ai servizi online della Pubblica Amministrazione. È indispensabile per accedere al sito INPS, Agenzia delle Entrate, Comune, e molti altri servizi. Offriamo assistenza per la registrazione e l'attivazione."
      },
      {
        id: "spid-2",
        question: "Come posso ottenere lo SPID?",
        answer: "Per ottenere SPID serve: maggiore età, documento d'identità valido, codice fiscale, numero di cellulare, email. Vi aiutiamo nella registrazione presso i provider autorizzati e nella verifica dell'identità, quando possibile anche presso il nostro ufficio."
      },
      {
        id: "spid-3",
        question: "Ho problemi con lo SPID, cosa posso fare?",
        answer: "Se avete problemi di accesso, password dimenticata, o blocco dell'account SPID, possiamo assistervi nel ripristino. Offriamo anche supporto per l'utilizzo dei servizi online della PA tramite il vostro SPID."
      }
    ]
  },
  {
    category: "Bonus e Agevolazioni",
    questions: [
      {
        id: "bonus-1",
        question: "Quali bonus posso richiedere nel 2025?",
        answer: "I principali bonus disponibili includono: Assegno Unico per i figli, bonus asilo nido, bonus bebè, agevolazioni per disabili, bonus ristrutturazioni, superbonus, ecobonus, bonus mobili. Vi informiamo sui requisiti e vi assistiamo nelle domande."
      },
      {
        id: "bonus-2",
        question: "Come richiedere l'Assegno Unico?",
        answer: "L'Assegno Unico si richiede online sul sito INPS con SPID, o tramite Contact Center, o presso il nostro Patronato. È necessario l'ISEE aggiornato per l'importo corretto. La domanda va rinnovata ogni anno e può essere presentata in qualsiasi momento."
      },
      {
        id: "bonus-3",
        question: "Posso cumolare più bonus?",
        answer: "Dipende dai bonus specifici. Alcuni sono cumulabili, altri sono alternativi. Durante la consulenza verifichiamo la vostra situazione specifica e vi indichiamo la combinazione più vantaggiosa di agevolazioni per la vostra famiglia."
      }
    ]
  },
  {
    category: "Pratiche Generali",
    questions: [
      {
        id: "general-1",
        question: "I vostri servizi sono gratuiti?",
        answer: "Sì, la maggior parte dei nostri servizi sono gratuiti: dichiarazioni dei redditi per dipendenti e pensionati, tutte le pratiche di Patronato, ISEE, assistenza per bonus. Per alcuni servizi specifici di consulenza professionale potrebbero essere applicati costi che comunicheremo sempre preventivamente."
      },
      {
        id: "general-2",
        question: "Come posso prenotare un appuntamento?",
        answer: "Potete prenotare un appuntamento chiamandoci al numero di telefono, tramite WhatsApp, o compilando il form sul nostro sito web. Cerchiamo sempre di dare appuntamenti in tempi brevi e offriamo anche consulenze telefoniche per pratiche urgenti."
      },
      {
        id: "general-3",
        question: "Posso venire senza appuntamento?",
        answer: "Preferiamo gli appuntamenti per garantirvi un servizio migliore e tempi di attesa ridotti. Tuttavia, per urgenze o informazioni rapide, potete passare negli orari di apertura e valuteremo la disponibilità per ricevervi."
      },
      {
        id: "general-4",
        question: "Offrite consulenze online?",
        answer: "Sì, offriamo consulenze telefoniche e videochiamate per molte pratiche. Potete inviarci i documenti via email o WhatsApp (in modo sicuro) e organizzare una consulenza a distanza. Alcune pratiche richiedono comunque la presenza fisica."
      }
    ]
  }
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
      className="border border-border rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        className="w-full px-6 py-4  text-left bg-background hover:bg-accent/50 transition-colors duration-200 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-foreground pr-4">{question.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-secondary/30 border-t border-border">
              <p className="text-muted-foreground leading-relaxed">{question.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ - Domande Frequenti | CafPotranto"
        description="Trova risposte alle domande più frequenti sui nostri servizi CAF, Patronato, SPID, bonus e agevolazioni. Assistenza fiscale e previdenziale professionale."
        url="/faq"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20 py-12">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
                Domande <span className="text-primary">Frequenti</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Trova risposte alle domande più comuni sui nostri servizi CAF, Patronato, 
              SPID e agevolazioni. Se non trovi quello che cerchi, contattaci direttamente.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="lg:py-24 py-12">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-primary/20">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((question) => (
                    <FAQItem key={question.id} question={question} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Non hai trovato la risposta che cercavi?
            </h2>
            <p className="text-muted-foreground mb-8">
              Il nostro team è pronto ad aiutarti con qualsiasi domanda sui nostri servizi. 
              Contattaci per una consulenza gratuita e personalizzata.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Chiamaci ora
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
