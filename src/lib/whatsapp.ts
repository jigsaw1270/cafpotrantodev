/**
 * WhatsApp Integration Utility
 * Handles WhatsApp message sending across different platforms and devices
 */

export interface WhatsAppMessage {
  phone: string;
  message: string;
}

interface ToastMessage {
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

/**
 * Show toast notification (uses custom event system)
 */
function showToast(toast: ToastMessage): void {
  if (typeof window === 'undefined') return;

  const event = new CustomEvent('show-toast', { detail: toast });
  window.dispatchEvent(event);
}

export interface ServiceWhatsAppData {
  serviceName: string;
  serviceSlug: string;
  categoryName?: string;
  price?: number;
  userMessage?: string;
}

/**
 * Format a WhatsApp message for a service inquiry
 */
export function formatServiceMessage(data: ServiceWhatsAppData): string {
  const { serviceName, categoryName, price, userMessage } = data;

  let message = `Ciao! 👋\n\nSono interessato al servizio: *${serviceName}*`;

  if (categoryName) {
    message += `\nCategoria: ${categoryName}`;
  }

  if (price) {
    message += `\nPrezzo: €${price.toFixed(2)}`;
  }

  message += `\n\nPotete fornirmi maggiori informazioni?`;

  if (userMessage) {
    message += `\n\nNote aggiuntive: ${userMessage}`;
  }

  message += `\n\nGrazie! 🙏`;

  return message;
}

/**
 * Detect if user is on mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detect if WhatsApp app is likely installed (mobile only)
 */
export function isWhatsAppAppAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  // This is a heuristic - we can't reliably detect if WhatsApp is installed
  // but we can make educated guesses based on device type
  const isMobile = isMobileDevice();
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  return isMobile && (isAndroid || isIOS);
}

/**
 * Generate WhatsApp URL based on device and app availability
 */
export function generateWhatsAppUrl(data: WhatsAppMessage): string {
  const { phone, message } = data;

  // Clean phone number (remove spaces, dashes, etc.)
  const cleanPhone = phone.replace(/\D/g, '');

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  const isMobile = isMobileDevice();
  const hasWhatsAppApp = isWhatsAppAppAvailable();

  if (isMobile && hasWhatsAppApp) {
    // Try to open WhatsApp app first on mobile
    return `whatsapp://send?phone=${cleanPhone}&text=${encodedMessage}`;
  } else {
    // Use WhatsApp Web for desktop or mobile without app
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }
}

/**
 * Open WhatsApp with fallback handling
 */
export function openWhatsApp(data: WhatsAppMessage): void {
  const webUrl = `https://wa.me/${data.phone.replace(/\D/g, '')}?text=${encodeURIComponent(data.message)}`;

  try {
    if (isMobileDevice() && isWhatsAppAppAvailable()) {
      // Try app first, fallback to web
      const appUrl = `whatsapp://send?phone=${data.phone.replace(/\D/g, '')}&text=${encodeURIComponent(data.message)}`;

      showToast({
        type: 'info',
        title: 'Apertura WhatsApp...',
        description: "Tentativo di apertura dell'app WhatsApp",
      });

      // Use a safer approach without iframe manipulation
      let appOpened = false;

      // Try to open app URL directly
      try {
        window.location.href = appUrl;
        appOpened = true;
      } catch (e) {
        console.warn('Direct app opening failed:', e);
      }

      // Fallback to web after a short delay
      const timeoutId = setTimeout(() => {
        if (!appOpened) {
          showToast({
            type: 'info',
            title: 'Apertura WhatsApp Web',
            description: 'Redirigengo a WhatsApp Web',
          });
          window.open(webUrl, '_blank');
        }
      }, 1500);

      // If app opens successfully, it will interrupt the timeout
      const handleBlur = () => {
        clearTimeout(timeoutId);
        appOpened = true;
        showToast({
          type: 'success',
          title: 'WhatsApp aperto!',
          description: 'App WhatsApp aperta con successo',
        });
        window.removeEventListener('blur', handleBlur);
      };

      window.addEventListener('blur', handleBlur, { once: true });
    } else {
      // Direct to WhatsApp Web
      showToast({
        type: 'info',
        title: 'Apertura WhatsApp Web',
        description: 'Ti stiamo reindirizzando a WhatsApp Web',
      });
      window.open(webUrl, '_blank');
    }
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    showToast({
      type: 'error',
      title: 'Errore',
      description: 'Impossibile aprire WhatsApp. Riprova più tardi.',
    });
  }
}

/**
 * Default WhatsApp contact configuration
 * You can customize this with your business WhatsApp number
 */
export const DEFAULT_WHATSAPP_CONFIG = {
  phone: '+8801942511663', // Replace with your actual WhatsApp business number
  businessName: 'CafPotranto',
  businessHours: '9:00 - 18:00 (Lun-Ven)',
};

/**
 * Get business hours message
 */
export function getBusinessHoursMessage(): string {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 1-5 = Mon-Fri, 6 = Saturday

  const isBusinessHours = day >= 1 && day <= 5 && hour >= 9 && hour <= 18;

  if (isBusinessHours) {
    return 'Siamo online ora! Ti risponderemo a breve. 🟢';
  } else {
    return `Siamo attualmente offline. Orari: ${DEFAULT_WHATSAPP_CONFIG.businessHours}. Ti risponderemo appena possibile! 🟡`;
  }
}

/**
 * Create a complete WhatsApp service inquiry
 */
export function createServiceInquiry(
  serviceData: ServiceWhatsAppData
): WhatsAppMessage {
  const message = formatServiceMessage(serviceData);

  return {
    phone: DEFAULT_WHATSAPP_CONFIG.phone,
    message: message,
  };
}
