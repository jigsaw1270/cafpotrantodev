'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cookie,
  X,
  Settings,
  Check,
  Shield,
  BarChart3,
  Target,
  Palette,
} from 'lucide-react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...allAccepted,
        timestamp: Date.now(),
      })
    );

    setSettings(allAccepted);
    setShowBanner(false);

    // Initialize analytics and marketing scripts here
    initializeScripts(allAccepted);
  };

  const acceptSelected = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...settings,
        timestamp: Date.now(),
      })
    );

    setShowBanner(false);
    setShowSettings(false);

    // Initialize only selected scripts
    initializeScripts(settings);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...onlyNecessary,
        timestamp: Date.now(),
      })
    );

    setSettings(onlyNecessary);
    setShowBanner(false);
  };

  const initializeScripts = (cookieSettings: CookieSettings) => {
    // Initialize Google Analytics if analytics cookies are accepted
    if (cookieSettings.analytics && typeof window !== 'undefined') {
      // Add Google Analytics initialization here
      console.log('🍪 Analytics cookies accepted - initializing GA');
    }

    // Initialize marketing scripts if marketing cookies are accepted
    if (cookieSettings.marketing && typeof window !== 'undefined') {
      // Add marketing scripts here (Google Ads, Facebook Pixel, etc.)
      console.log(
        '🍪 Marketing cookies accepted - initializing marketing scripts'
      );
    }

    // Initialize preferences if preferences cookies are accepted
    if (cookieSettings.preferences && typeof window !== 'undefined') {
      // Add preference scripts here
      console.log('🍪 Preferences cookies accepted');
    }
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies

    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center p-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="pointer-events-auto w-full max-w-4xl"
        >
          <div className="bg-new-beige/95 border-light-teal/30 shadow-elegant-xl overflow-hidden rounded-3xl border backdrop-blur-xl">
            {!showSettings ? (
              // Main Banner
              <div className="from-new-beige/95 to-new-white/90 bg-gradient-to-br p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-light-teal/20 border-light-teal/30 flex-shrink-0 rounded-full border p-3 backdrop-blur-md">
                    <Cookie className="text-light-teal h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-new-navy mb-3 text-xl font-bold drop-shadow-sm">
                      🍪 Utilizziamo i Cookie
                    </h3>

                    <p className="text-new-light-navy mb-6 text-sm leading-relaxed sm:text-base">
                      Utilizziamo cookie necessari per il funzionamento del sito
                      e cookie opzionali per migliorare la tua esperienza,
                      analizzare il traffico e personalizzare i contenuti. Puoi
                      scegliere quali cookie accettare cliccando su
                      "Impostazioni" o accettare tutti i cookie cliccando su
                      "Accetta Tutti".
                    </p>

                    <div className="text-new-dim-cyan mb-6 text-xs">
                      <p>
                        I cookie necessari sono sempre abilitati per garantire
                        il corretto funzionamento del sito. Per maggiori
                        informazioni, consulta la nostra{' '}
                        <a
                          href="/privacy"
                          className="text-light-teal hover:text-dark-teal font-medium underline transition-colors"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={acceptAll}
                        className="bg-light-teal hover:bg-dark-teal flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <Check className="h-4 w-4" />
                        Accetta Tutti
                      </button>

                      <button
                        onClick={() => setShowSettings(true)}
                        className="bg-new-white/80 border-light-teal/30 hover:bg-new-white text-new-navy flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-medium backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                      >
                        <Settings className="h-4 w-4" />
                        Impostazioni
                      </button>

                      <button
                        onClick={rejectAll}
                        className="text-new-light-navy hover:text-new-navy rounded-xl px-6 py-3 font-medium transition-colors duration-200"
                      >
                        Rifiuta Opzionali
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Settings Panel
              <div className="from-new-beige/95 to-new-white/90 bg-gradient-to-br p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-new-navy flex items-center gap-2 text-xl font-bold drop-shadow-sm">
                    <Cookie className="text-light-teal h-5 w-5" />
                    Impostazioni Cookie
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="hover:bg-new-white/60 rounded-lg p-2 backdrop-blur-sm transition-colors"
                  >
                    <X className="text-new-light-navy h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Necessary Cookies */}
                  <div className="bg-new-white/60 border-light-teal/20 flex items-start justify-between rounded-xl border p-4 backdrop-blur-sm">
                    <div className="flex flex-1 items-start gap-3">
                      <div className="bg-light-teal/20 mt-0.5 rounded-full p-2">
                        <Shield className="text-light-teal h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-new-navy mb-1 font-semibold">
                          Cookie Necessari
                        </h4>
                        <p className="text-new-light-navy text-sm">
                          Questi cookie sono essenziali per il funzionamento del
                          sito web e non possono essere disabilitati.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-light-teal/20 text-light-teal border-light-teal/30 rounded-full border px-3 py-1 text-xs font-medium">
                        Sempre Attivi
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-new-white/60 border-light-teal/20 flex items-start justify-between rounded-xl border p-4 backdrop-blur-sm">
                    <div className="flex flex-1 items-start gap-3">
                      <div className="bg-light-teal/20 mt-0.5 rounded-full p-2">
                        <BarChart3 className="text-light-teal h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-new-navy mb-1 font-semibold">
                          Cookie Analitici
                        </h4>
                        <p className="text-new-light-navy text-sm">
                          Ci aiutano a capire come i visitatori interagiscono
                          con il sito raccogliendo informazioni anonime.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => toggleSetting('analytics')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.analytics
                            ? 'bg-light-teal'
                            : 'bg-new-dim-cyan/50'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                            settings.analytics
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-new-white/60 border-light-teal/20 flex items-start justify-between rounded-xl border p-4 backdrop-blur-sm">
                    <div className="flex flex-1 items-start gap-3">
                      <div className="bg-light-teal/20 mt-0.5 rounded-full p-2">
                        <Target className="text-light-teal h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-new-navy mb-1 font-semibold">
                          Cookie di Marketing
                        </h4>
                        <p className="text-new-light-navy text-sm">
                          Utilizzati per tracciare i visitatori sui siti web per
                          mostrare annunci pertinenti e coinvolgenti.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => toggleSetting('marketing')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.marketing
                            ? 'bg-light-teal'
                            : 'bg-new-dim-cyan/50'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                            settings.marketing
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Preferences Cookies */}
                  <div className="bg-new-white/60 border-light-teal/20 flex items-start justify-between rounded-xl border p-4 backdrop-blur-sm">
                    <div className="flex flex-1 items-start gap-3">
                      <div className="bg-light-teal/20 mt-0.5 rounded-full p-2">
                        <Palette className="text-light-teal h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-new-navy mb-1 font-semibold">
                          Cookie delle Preferenze
                        </h4>
                        <p className="text-new-light-navy text-sm">
                          Permettono al sito di ricordare le tue scelte per
                          offrirti funzionalità migliorate e personalizzate.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => toggleSetting('preferences')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.preferences
                            ? 'bg-light-teal'
                            : 'bg-new-dim-cyan/50'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                            settings.preferences
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-light-teal/30 mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row">
                  <button
                    onClick={acceptSelected}
                    className="bg-light-teal hover:bg-dark-teal flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Check className="h-4 w-4" />
                    Salva Preferenze
                  </button>

                  <button
                    onClick={acceptAll}
                    className="bg-new-white/80 border-light-teal/30 hover:bg-new-white text-new-navy rounded-xl border px-6 py-3 font-medium backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    Accetta Tutti
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
