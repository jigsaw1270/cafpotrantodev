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

interface WhatsAppStorageData {
  value: string;
  timestamp: number;
  expiresAt: number;
}

/**
 * WhatsApp Storage with 24-hour expiration
 */
export class WhatsAppStorage {
  private static readonly EXPIRY_HOURS = 24;
  private static readonly EXPIRY_MS =
    WhatsAppStorage.EXPIRY_HOURS * 60 * 60 * 1000; // 24 hours in milliseconds

  /**
   * Set item with 24-hour expiration
   */
  static setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;

    try {
      const now = Date.now();
      const data: WhatsAppStorageData = {
        value,
        timestamp: now,
        expiresAt: now + this.EXPIRY_MS,
      };

      localStorage.setItem(key, JSON.stringify(data));
      console.log(`🕒 WhatsApp data set with 24h expiry: ${key}`);
    } catch (error) {
      console.warn('WhatsApp storage setItem failed:', error);
    }
  }

  /**
   * Get item if not expired, auto-clean if expired
   */
  static getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const data: WhatsAppStorageData = JSON.parse(stored);
      const now = Date.now();

      // Check if expired
      if (now > data.expiresAt) {
        console.log(`⏰ WhatsApp data expired, removing: ${key}`);
        localStorage.removeItem(key);
        return null;
      }

      // Return valid data
      const hoursLeft = Math.ceil((data.expiresAt - now) / (60 * 60 * 1000));
      console.log(`✅ WhatsApp data valid, ${hoursLeft}h remaining: ${key}`);
      return data.value;
    } catch (error) {
      console.warn('WhatsApp storage getItem failed:', error);
      // Clean up corrupted data
      localStorage.removeItem(key);
      return null;
    }
  }

  /**
   * Remove item manually
   */
  static removeItem(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(key);
      console.log(`🗑️ WhatsApp data manually removed: ${key}`);
    } catch (error) {
      console.warn('WhatsApp storage removeItem failed:', error);
    }
  }

  /**
   * Clean all expired WhatsApp data
   */
  static cleanExpiredData(): void {
    if (typeof window === 'undefined') return;

    try {
      const now = Date.now();
      const keysToRemove: string[] = [];

      // Find all WhatsApp-related keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          !key ||
          (!key.startsWith('whatsapp-') && !key.startsWith('request-'))
        ) {
          continue;
        }

        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const data: WhatsAppStorageData = JSON.parse(stored);
            if (now > data.expiresAt) {
              keysToRemove.push(key);
            }
          }
        } catch {
          // If we can't parse it, it's probably old format - remove it
          keysToRemove.push(key);
        }
      }

      // Remove expired keys
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`🧹 Cleaned expired WhatsApp data: ${key}`);
      });

      if (keysToRemove.length > 0) {
        console.log(
          `✨ Cleaned ${keysToRemove.length} expired WhatsApp entries`
        );
      }
    } catch (error) {
      console.warn('WhatsApp storage cleanup failed:', error);
    }
  }

  /**
   * Get expiration info for debugging
   */
  static getExpirationInfo(
    key: string
  ): { isValid: boolean; hoursLeft: number; expiresAt: Date } | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const data: WhatsAppStorageData = JSON.parse(stored);
      const now = Date.now();
      const hoursLeft = Math.max(
        0,
        Math.ceil((data.expiresAt - now) / (60 * 60 * 1000))
      );

      return {
        isValid: now <= data.expiresAt,
        hoursLeft,
        expiresAt: new Date(data.expiresAt),
      };
    } catch {
      return null;
    }
  }

  /**
   * Initialize cleanup - call this on app start
   */
  static initialize(): void {
    this.cleanExpiredData();

    // Set up periodic cleanup every hour
    if (typeof window !== 'undefined') {
      setInterval(
        () => {
          this.cleanExpiredData();
        },
        60 * 60 * 1000
      ); // Every hour
    }
  }
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
  phone: '+393668735046', // CAF Monza WhatsApp business number
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

/**
 * Convenience functions for WhatsApp state management with 24h expiration
 */
export const WhatsAppState = {
  /**
   * Mark WhatsApp as clicked for a service (expires in 24h)
   */
  setWhatsAppClicked(serviceSlug: string): void {
    WhatsAppStorage.setItem(`whatsapp-clicked-${serviceSlug}`, 'true');
  },

  /**
   * Check if WhatsApp was clicked for a service (auto-expires in 24h)
   */
  isWhatsAppClicked(serviceSlug: string): boolean {
    return (
      WhatsAppStorage.getItem(`whatsapp-clicked-${serviceSlug}`) === 'true'
    );
  },

  /**
   * Enable request button for a service (expires in 24h)
   */
  setRequestEnabled(serviceSlug: string): void {
    WhatsAppStorage.setItem(`request-enabled-${serviceSlug}`, 'true');
  },

  /**
   * Check if request button is enabled for a service (auto-expires in 24h)
   */
  isRequestEnabled(serviceSlug: string): boolean {
    return WhatsAppStorage.getItem(`request-enabled-${serviceSlug}`) === 'true';
  },

  /**
   * Reset all state for a service
   */
  resetService(serviceSlug: string): void {
    WhatsAppStorage.removeItem(`whatsapp-clicked-${serviceSlug}`);
    WhatsAppStorage.removeItem(`request-enabled-${serviceSlug}`);
  },

  /**
   * Get debug information for a service
   */
  getDebugInfo(serviceSlug: string) {
    const whatsappInfo = WhatsAppStorage.getExpirationInfo(
      `whatsapp-clicked-${serviceSlug}`
    );
    const requestInfo = WhatsAppStorage.getExpirationInfo(
      `request-enabled-${serviceSlug}`
    );

    return {
      serviceSlug,
      whatsappClicked: {
        isSet: this.isWhatsAppClicked(serviceSlug),
        ...whatsappInfo,
      },
      requestEnabled: {
        isSet: this.isRequestEnabled(serviceSlug),
        ...requestInfo,
      },
    };
  },

  /**
   * Initialize the WhatsApp state system (call on app start)
   */
  initialize(): void {
    WhatsAppStorage.initialize();
  },
};

/**
 * Testing utilities for development
 * Add these to window object in development mode
 */
export const WhatsAppTestUtils = {
  /**
   * Clear all WhatsApp data (for testing)
   */
  clearAll(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    const whatsappKeys = keys.filter(
      key => key.startsWith('whatsapp-') || key.startsWith('request-')
    );

    whatsappKeys.forEach(key => localStorage.removeItem(key));
    console.log(`🧹 Cleared ${whatsappKeys.length} WhatsApp entries`);
  },

  /**
   * Simulate expired data by setting timestamp to past
   */
  expireService(serviceSlug: string): void {
    if (typeof window === 'undefined') return;

    const expiredData = {
      value: 'true',
      timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
      expiresAt: Date.now() - 60 * 60 * 1000, // 1 hour ago
    };

    localStorage.setItem(
      `whatsapp-clicked-${serviceSlug}`,
      JSON.stringify(expiredData)
    );
    localStorage.setItem(
      `request-enabled-${serviceSlug}`,
      JSON.stringify(expiredData)
    );
    console.log(`⏰ Set expired data for ${serviceSlug}`);
  },

  /**
   * List all WhatsApp data with expiration info
   */
  listAll(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    const whatsappKeys = keys.filter(
      key => key.startsWith('whatsapp-') || key.startsWith('request-')
    );

    const data = whatsappKeys
      .map(key => {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const parsed = JSON.parse(stored);
            const hoursLeft = Math.ceil(
              (parsed.expiresAt - Date.now()) / (60 * 60 * 1000)
            );
            return {
              key,
              hoursLeft,
              expiresAt: new Date(parsed.expiresAt).toLocaleString(),
              isExpired: Date.now() > parsed.expiresAt,
            };
          }
        } catch {
          return { key, error: 'Invalid format' };
        }
        return null;
      })
      .filter(Boolean);

    console.table(data);
  },
};

// Make testing utilities available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).WhatsAppTestUtils = WhatsAppTestUtils;
  (window as any).WhatsAppState = WhatsAppState;
}
