import { SEO } from '@/components/seo';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy - CafPotranto"
        description="Informativa sulla privacy e utilizzo dei cookie di CafPotranto Servizi Legali"
        url="/privacy"
      />

      <div className="bg-new-beige min-h-screen py-12">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="bg-new-white/95 border-light-teal/30 shadow-elegant-xl rounded-3xl border p-8 backdrop-blur-xl sm:p-12">
              <h1 className="text-new-navy mb-8 text-3xl font-bold drop-shadow-sm sm:text-4xl">
                Privacy Policy & Cookie Policy
              </h1>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-new-navy mb-4 text-2xl font-bold">
                    1. Informazioni Generali
                  </h2>
                  <p className="text-new-light-navy mb-4">
                    La presente Privacy Policy descrive le modalità di
                    trattamento dei dati personali degli utenti che consultano
                    il sito web di CafPotranto Servizi Legali.
                  </p>
                  <p className="text-new-light-navy">
                    Il titolare del trattamento è CafPotranto Servizi Legali,
                    con sede legale in Via Lorenteggio 172, Milano 20147.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-new-navy mb-4 text-2xl font-bold">
                    2. Cookie Policy
                  </h2>

                  <h3 className="text-new-navy mb-3 text-xl font-semibold">
                    Cosa sono i Cookie
                  </h3>
                  <p className="mb-4 text-gray-700">
                    I cookie sono piccoli file di testo che vengono memorizzati
                    sul tuo dispositivo quando visiti un sito web. Ci aiutano a
                    migliorare la tua esperienza di navigazione.
                  </p>

                  <h3 className="text-new-navy mb-3 text-xl font-semibold">
                    Tipologie di Cookie Utilizzati
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-light-teal/10 border-light-teal/20 rounded-lg border p-4 backdrop-blur-sm">
                      <h4 className="text-new-navy mb-2 font-semibold">
                        🔒 Cookie Necessari
                      </h4>
                      <p className="text-new-light-navy text-sm">
                        Questi cookie sono essenziali per il funzionamento del
                        sito web. Includono cookie per la gestione delle
                        sessioni, delle preferenze di sicurezza e del consenso
                        ai cookie.
                      </p>
                    </div>

                    <div className="bg-light-teal/10 border-light-teal/20 rounded-lg border p-4 backdrop-blur-sm">
                      <h4 className="text-new-navy mb-2 font-semibold">
                        📊 Cookie Analitici
                      </h4>
                      <p className="text-new-light-navy text-sm">
                        Utilizziamo Google Analytics per raccogliere
                        informazioni anonime su come i visitatori utilizzano il
                        nostro sito. Questi dati ci aiutano a migliorare il sito
                        web e l'esperienza utente.
                      </p>
                    </div>

                    <div className="bg-light-teal/10 border-light-teal/20 rounded-lg border p-4 backdrop-blur-sm">
                      <h4 className="text-new-navy mb-2 font-semibold">
                        🎯 Cookie di Marketing
                      </h4>
                      <p className="text-new-light-navy text-sm">
                        Questi cookie vengono utilizzati per tracciare i
                        visitatori sui siti web al fine di mostrare annunci
                        pertinenti e coinvolgenti per i singoli utenti.
                      </p>
                    </div>

                    <div className="bg-light-teal/10 border-light-teal/20 rounded-lg border p-4 backdrop-blur-sm">
                      <h4 className="text-new-navy mb-2 font-semibold">
                        ⚙️ Cookie delle Preferenze
                      </h4>
                      <p className="text-new-light-navy text-sm">
                        Permettono al sito di ricordare le informazioni che
                        modificano il modo in cui il sito si comporta o appare,
                        come la lingua preferita o la regione in cui ti trovi.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-new-navy mb-4 text-2xl font-bold">
                    3. Gestione dei Cookie
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Puoi gestire le tue preferenze sui cookie in qualsiasi
                    momento attraverso:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Il banner dei cookie che appare alla prima visita</li>
                    <li>Le impostazioni del tuo browser web</li>
                    <li>Contattandoci direttamente</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-new-navy mb-4 text-2xl font-bold">
                    4. Dati Personali
                  </h2>
                  <p className="mb-4 text-gray-700">
                    I dati personali raccolti attraverso il sito web vengono
                    utilizzati esclusivamente per fornire i servizi richiesti e
                    migliorare l'esperienza utente.
                  </p>
                  <p className="text-gray-700">
                    Non condividiamo i tuoi dati personali con terze parti senza
                    il tuo consenso esplicito, salvo quando richiesto dalla
                    legge.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-new-navy mb-4 text-2xl font-bold">
                    5. Diritti dell'Utente
                  </h2>
                  <p className="mb-4 text-gray-700">Hai il diritto di:</p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Accedere ai tuoi dati personali</li>
                    <li>Rettificare i dati inesatti</li>
                    <li>Cancellare i tuoi dati (diritto all'oblio)</li>
                    <li>Limitare il trattamento dei dati</li>
                    <li>Portabilità dei dati</li>
                    <li>Opporti al trattamento</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-new-navy mb-4 text-2xl font-bold">
                    6. Contatti
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Per qualsiasi domanda relativa a questa Privacy Policy o per
                    esercitare i tuoi diritti, puoi contattarci:
                  </p>
                  <div className="bg-light-teal/10 border-light-teal/20 rounded-lg border p-4 backdrop-blur-sm">
                    <p className="text-new-navy">
                      <strong>Email:</strong> CAFMONZA12@GMAIL.COM
                      <br />
                      <strong>Telefono:</strong> +39 366 8735 046
                      <br />
                      <strong>Indirizzo:</strong> Via Lorenteggio 172, Milano
                      20147
                    </p>
                  </div>
                </section>

                <section>
                  <p className="text-sm text-gray-600">
                    <strong>Ultimo aggiornamento:</strong> 7 Novembre 2025
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
