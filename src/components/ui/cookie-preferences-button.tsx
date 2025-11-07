'use client';

import { Settings } from 'lucide-react';

export function CookiePreferencesButton() {
  const handleOpenSettings = () => {
    // Clear the existing consent to show the banner again
    localStorage.removeItem('cookie-consent');
    // Reload the page to show the cookie banner
    window.location.reload();
  };

  return (
    <button
      onClick={handleOpenSettings}
      className="bg-new-navy/90 hover:bg-new-navy text-new-white border-light-teal/30 shadow-elegant fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:scale-105"
      title="Gestisci preferenze cookie"
    >
      <Settings className="h-4 w-4" />
      Cookie
    </button>
  );
}
