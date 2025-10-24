import Link from 'next/link';
import Image from 'next/image';
import { Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Chi Siamo' },
  { href: '/contact', label: 'Contatti' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-8 py-12 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info & Legal */}
          <div className="space-y-4">
            <div>
              <h3 className="text-cyan mb-2 text-xl font-bold">
                CAF - PATRONATO SINDACATO
              </h3>
              <p className="text-xs leading-relaxed text-gray-400">
                Centro di Assistenza Fiscale autorizzato per servizi di
                consulenza fiscale, assistenza INPS, ISEE e pratiche
                amministrative.
              </p>
            </div>

            {/* Legal Entity */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
              <p className="text-cyan mb-2 text-xs font-semibold tracking-wide uppercase">
                Ragione Sociale
              </p>
              <p className="text-sm font-bold text-white">ISLAM AMIRUL</p>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-400">
                <p>
                  <span className="font-semibold text-gray-300">P.IVA:</span>{' '}
                  02688260187
                </p>
                <p>
                  <span className="font-semibold text-gray-300">REA:</span>{' '}
                  MI-2618947
                </p>
                <p className="col-span-2">
                  <span className="font-semibold text-gray-300">C.F.:</span>{' '}
                  SLMMRL96E17Z249Z
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="text-cyan h-3 w-3" />
                <a
                  href="mailto:cafsettembrini31@pec.it"
                  className="hover:text-cyan text-gray-400 transition-colors"
                >
                  cafsettembrini31@pec.it
                </a>
              </div>
              <p className="text-xs text-gray-500">
                PEC - Posta Elettronica Certificata
              </p>
            </div>
          </div>

          {/* Registration & Compliance */}
          <div className="space-y-4">
            {/* Activity Badge */}
            <div className="border-cyan/30 bg-cyan/10 rounded-lg border p-3">
              <p className="text-cyan mb-1 text-xs font-semibold tracking-wide uppercase">
                Attività Autorizzata
              </p>
              <p className="text-sm font-bold text-white">
                Centro di Assistenza Fiscale (CAF)
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-300">
                Codice ATECO: 69.20.07 - Autorizzato alla trasmissione
                telematica secondo D.M. 164/1999
              </p>
            </div>

            {/* Registration Info */}
            <div className="space-y-2 text-xs text-gray-400">
              <p className="flex items-start gap-2">
                <span className="text-cyan">✓</span>
                <span>Registro Imprese CCIAA Milano Monza Brianza Lodi</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-cyan">✓</span>
                <span>Conformità normative CAF e protezione dati GDPR</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-cyan">✓</span>
                <span>Sezione speciale - Qualifica Piccolo Imprenditore</span>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-2 text-sm font-bold text-white">Link Utili</h4>
              <ul className="grid grid-cols-2 gap-1">
                {quickLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-cyan text-xs text-gray-400 transition-colors"
                    >
                      › {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-cyan text-xs text-gray-400 transition-colors"
                  >
                    › Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie"
                    className="hover:text-cyan text-xs text-gray-400 transition-colors"
                  >
                    › Cookie
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Certifications & Social */}
          <div className="space-y-4">
            {/* Social Media */}
            <div>
              <h4 className="mb-2 text-sm font-bold text-white">Seguici</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="hover:border-cyan hover:bg-cyan flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900/50 text-gray-400 transition-all hover:text-white"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="hover:border-cyan hover:bg-cyan flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900/50 text-gray-400 transition-all hover:text-white"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="hover:border-cyan hover:bg-cyan flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900/50 text-gray-400 transition-all hover:text-white"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Certifications Compact */}
            <div>
              <h4 className="mb-2 text-sm font-bold text-white">
                Certificazioni
              </h4>
              <div className="flex items-center gap-4">
                <div className="hover:border-cyan/50 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30 p-3 transition-all">
                  <Image
                    src="/images/footer/iso25012-footer.webp"
                    alt="ISO 25012"
                    width={80}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <div className="hover:border-cyan/50 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30 p-3 transition-all">
                  <Image
                    src="/images/footer/LOGO-SINALP-con-CERCHIO-METALLIZZATO.png"
                    alt="SINALP"
                    width={80}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <div className="hover:border-cyan/50 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30 p-3 transition-all">
                  <Image
                    src="/images/footer/Tavola-disegno-1v2-1.png"
                    alt="Certification"
                    width={80}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="rounded-lg border border-gray-800/50 bg-gray-900/20 p-3">
              <p className="text-xs leading-relaxed text-gray-400">
                Operiamo in conformità con GDPR (Reg. UE 2016/679), D.Lgs.
                196/2003 e normative CAF vigenti per garantire sicurezza e
                trasparenza.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-4">
          <div className="flex flex-col gap-2 text-center text-xs text-gray-400 lg:flex-row lg:justify-between lg:text-left">
            <p>
              © {new Date().getFullYear()} CAF - PATRONATO SINDACATO. Tutti i
              diritti riservati.
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
              <Link
                href="/privacy"
                className="hover:text-cyan transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookie"
                className="hover:text-cyan transition-colors"
              >
                Cookie
              </Link>
              <Link href="/terms" className="hover:text-cyan transition-colors">
                Termini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
