import Link from 'next/link';

const footerLinks = {
  services: [
    { href: '/services/diritti-consumatori', label: 'Diritti dei consumatori' },
    { href: '/services/condizioni-contrattuali', label: 'Condizioni Contrattuali' },
    { href: '/services/politiche-qualita', label: 'Politiche per la qualità' },
    { href: '/services/gdpr-openapi', label: 'GDPR OPENAPI' },
    { href: '/services/privacy-policy', label: 'Privacy policy' },
    { href: '/services/accessibilita', label: 'Accessibilità' },
  ],
  privacy: [
    { href: '/privacy-anicic', label: 'Privacy A.N.I.C.I.C.' },
    { href: '/privacy-info-commerciali', label: 'Privacy Info Commerciali' },
    { href: '/certificazioni-licenze', label: 'Certificazioni, licenze e Membership' },
    { href: '/personalizza-cookie', label: 'Personalizza cookie policy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">CAFPOTRANTO.COM</div>
                  <div className="text-white/80 text-xs">Assistenza, pratiche e CAF on line</div>
                </div>
              </div>
            </Link>
            
            <div className="text-white/80 text-sm space-y-1">
              <p>Carbon free energy for Our Cloud ⚡ Low CO₂</p>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              <div className="bg-white/10 px-2 py-1 rounded text-xs">ISO 25012</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">ISTITUTO GIORDANO</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">AGCM</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">RATING LEGALITÀ</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">⚕️</div>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <ul className="space-y-2">
              {footerLinks.services.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy Links */}
          <div className="space-y-4">
            <ul className="space-y-2">
              {footerLinks.privacy.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="bg-white/10 px-2 py-1 rounded text-xs">PayPal</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">American Express</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Discover</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Mastercard</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Visa</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Maestro</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Postepay</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Diners</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Bonifico</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">PagoPA</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">PayPal</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">🔒 Braintree</div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="text-white/80 text-sm space-y-2">
            <p>© 2025 Openapi SpA Unipersonale - Società sottoposta a direzione e controllo della Open Holding Srl</p>
            <p>Viale Filippo Tommaso Marinetti 221 - 00143 Roma</p>
            <p>REA 1378273 Cap. Soc. € 50.000,00 i.v. - P.I. IT12485671007 - CODICE DESTINATARIO: USAL8PV</p>
            <p>Openapi è certificata:</p>
            <p>
              Sistema qualità - <strong>UNI EN ISO 9001:2015</strong> - Qualità dei Dati <strong>ISO 25012:2014</strong> - Gestione della Sicurezza <strong>ISO/IEC 27001:2022</strong>
            </p>
            <p>
              Tutti i prezzi sono da considerarsi al netto di eventuale IVA, eventuali imposte di bollo, diritti di segreteria e/o 
              imposte o tasse altrimenti denominate se dovute. Tutti i loghi eicatti nel portale sono coperti da copyright e di 
              proprietà dei rispettivi proprietari.
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-4 border-t border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
