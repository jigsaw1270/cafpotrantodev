// Google Translate initialization for native browser translation
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'it',
      includedLanguages: 'en,fr,es,de',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    'google_translate_element'
  );
}

// Add Google Translate widget to page if not already present
function addGoogleTranslateWidget() {
  // Check if widget already exists
  if (document.getElementById('google_translate_element')) {
    return;
  }

  // Create widget container
  const translateDiv = document.createElement('div');
  translateDiv.id = 'google_translate_element';
  translateDiv.style.position = 'fixed';
  translateDiv.style.top = '10px';
  translateDiv.style.right = '10px';
  translateDiv.style.zIndex = '9999';
  translateDiv.style.background = 'white';
  translateDiv.style.padding = '5px';
  translateDiv.style.borderRadius = '5px';
  translateDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

  document.body.appendChild(translateDiv);

  // Load Google Translate script if not already loaded
  if (typeof google === 'undefined' || !google.translate) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    googleTranslateElementInit();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addGoogleTranslateWidget);
} else {
  addGoogleTranslateWidget();
}
