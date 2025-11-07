'use client';

export function CookiePreferencesLink() {
  const handleOpenSettings = () => {
    // Clear the existing consent to show the banner again
    localStorage.removeItem('cookie-consent');
    // Reload the page to show the cookie banner
    window.location.reload();
  };

  return (
    <button
      onClick={handleOpenSettings}
      className="hover:text-cyan transition-colors"
    >
      Impostazioni Cookie
    </button>
  );
}
