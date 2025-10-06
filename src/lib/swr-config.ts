import { SWRConfiguration } from 'swr';

// Default fetcher function for SWR
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      'An error occurred while fetching the data.'
    ) as any;
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// SWR default configuration
export const swrConfig: SWRConfiguration = {
  fetcher,
  // Cache for 5 minutes, but check for updates in background
  dedupingInterval: 300000, // 5 minutes
  // Don't revalidate on focus to reduce API calls
  revalidateOnFocus: false,
  // Revalidate when user comes back online
  revalidateOnReconnect: true,
  // Don't revalidate on mount if data exists
  revalidateOnMount: true,
  // Retry failed requests
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  // Show loading state when switching tabs back
  revalidateIfStale: true,
  // Keep previous data while fetching new data
  keepPreviousData: true,
};

// Cache keys for different data types
export const CACHE_KEYS = {
  CATEGORIES: '/api/categories',
  SERVICES: '/api/services',
  SERVICE_BY_SLUG: (slug: string) => `/api/services/${slug}`,
  CATEGORY_SERVICES: (categorySlug: string) =>
    `/api/categories/${categorySlug}/services`,
} as const;

// Local storage cache functions
export const localCache = {
  set: (key: string, data: any) => {
    if (typeof window === 'undefined') return;

    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(`swr-cache-${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  get: (key: string, maxAge: number = 3600000) => {
    // Default 1 hour
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(`swr-cache-${key}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > maxAge;

      return isExpired ? null : data;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },

  clear: (key?: string) => {
    if (typeof window === 'undefined') return;

    if (key) {
      localStorage.removeItem(`swr-cache-${key}`);
    } else {
      // Clear all SWR cache items
      const keys = Object.keys(localStorage).filter(k =>
        k.startsWith('swr-cache-')
      );
      keys.forEach(k => localStorage.removeItem(k));
    }
  },
};
