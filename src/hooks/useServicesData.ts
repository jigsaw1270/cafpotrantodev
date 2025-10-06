import useSWR from 'swr';
import { CACHE_KEYS, localCache } from '@/lib/swr-config';
import { Category, Subservice } from '@/lib/types';
import apiClient from '@/lib/api';

// Fetcher functions that use our API client
const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.getCategories({
    active: true,
    limit: 100,
    sortBy: 'displayOrder',
    sortOrder: 'asc',
  });

  if (!response.success || !response.data) {
    throw new Error(response.message || 'Failed to fetch categories');
  }

  return response.data.categories;
};

const fetchCategoryServices = async (
  categorySlug: string
): Promise<Subservice[]> => {
  // First get the category by slug to get its ID
  const categoriesResponse = await apiClient.getCategories({
    active: true,
    limit: 100,
  });

  if (!categoriesResponse.success || !categoriesResponse.data) {
    throw new Error('Failed to fetch categories');
  }

  const category = categoriesResponse.data.categories.find(
    (cat: Category) => cat.slug === categorySlug
  );

  if (!category) {
    throw new Error(`Category not found: ${categorySlug}`);
  }

  const servicesResponse = await apiClient.getSubservicesByCategory(
    category._id,
    {
      active: true,
      limit: 100,
      sortBy: 'displayOrder',
      sortOrder: 'asc',
    }
  );

  if (!servicesResponse.success || !servicesResponse.data) {
    throw new Error('Failed to fetch services for category');
  }

  return servicesResponse.data.subservices || [];
};

const fetchServiceBySlug = async (slug: string): Promise<Subservice> => {
  const response = await apiClient.getSubserviceBySlug(slug);

  if (!response.success || !response.data) {
    throw new Error(response.message || 'Failed to fetch service');
  }

  return response.data.subservice;
};

// Hook for fetching all categories
export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    CACHE_KEYS.CATEGORIES,
    fetchCategories,
    {
      fallbackData: localCache.get('categories'),
      onSuccess: data => {
        localCache.set('categories', data);
      },
      // Revalidate every 30 minutes
      dedupingInterval: 1800000,
    }
  );

  return {
    categories: data || [],
    isLoading,
    error,
    refetch: mutate,
  };
}

// Hook for fetching all services data
export function useServicesData() {
  const { categories, error, isLoading } = useCategories();

  return {
    categories: categories || [],
    services: [], // Could be implemented later if needed
    isLoading,
    error,
    refetch: () => {}, // Could be implemented later
  };
}

// Hook for fetching services by category
export function useCategoryServices(categorySlug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Subservice[]>(
    categorySlug ? CACHE_KEYS.CATEGORY_SERVICES(categorySlug) : null,
    categorySlug ? () => fetchCategoryServices(categorySlug) : null,
    {
      fallbackData: localCache.get(`category-${categorySlug}`),
      onSuccess: data => {
        if (categorySlug) {
          localCache.set(`category-${categorySlug}`, data);
        }
      },
      // Revalidate every 10 minutes for category-specific data
      dedupingInterval: 600000,
    }
  );

  return {
    services: data || [],
    isLoading: categorySlug ? isLoading : false,
    error: categorySlug ? error : null,
    refetch: mutate,
  };
}

// Hook for fetching a single service by slug
export function useService(slug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Subservice>(
    slug ? CACHE_KEYS.SERVICE_BY_SLUG(slug) : null,
    slug ? () => fetchServiceBySlug(slug) : null,
    {
      fallbackData: localCache.get(`service-${slug}`),
      onSuccess: data => {
        if (slug) {
          localCache.set(`service-${slug}`, data);
        }
      },
      // Revalidate every 5 minutes for individual services
      dedupingInterval: 300000,
    }
  );

  return {
    service: data || null,
    isLoading: slug ? isLoading : false,
    error: slug ? error : null,
    refetch: mutate,
  };
}

// Hook for prefetching data (useful for hover effects, etc.)
export function usePrefetch() {
  const { mutate } = useSWR(null); // Get mutate function

  return {
    prefetchCategories: async () => {
      // This will cache the data without triggering a re-render
      await mutate(CACHE_KEYS.CATEGORIES);
    },
    prefetchCategoryServices: async (categorySlug: string) => {
      await mutate(CACHE_KEYS.CATEGORY_SERVICES(categorySlug));
    },
  };
}

// Utility function to clear all cached data
export function clearAllCache() {
  localCache.clear();
}

// Utility function to get cache statistics
export function getCacheInfo() {
  if (typeof window === 'undefined') return null;

  const cacheKeys = Object.keys(localStorage).filter(k =>
    k.startsWith('swr-cache-')
  );
  const cacheSize = cacheKeys.reduce((total, key) => {
    return total + (localStorage.getItem(key)?.length || 0);
  }, 0);

  return {
    itemCount: cacheKeys.length,
    sizeBytes: cacheSize,
    sizeKB: (cacheSize / 1024).toFixed(2),
  };
}
