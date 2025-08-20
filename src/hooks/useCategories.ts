'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category, ApiResponse, CategoriesQuery } from '@/lib/types';
import apiClient from '@/lib/api';

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategories(query: CategoriesQuery = {}): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getCategories({
        active: true,
        sortBy: 'displayOrder',
        sortOrder: 'asc',
        limit: 50,
        ...query,
      });

      if (response.success && response.data) {
        setCategories(response.data.categories || []);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

interface UseCategoriesWithCountsResult {
  categories: (Category & { subservicesCount: number })[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategoriesWithCounts(): UseCategoriesWithCountsResult {
  const [categories, setCategories] = useState<(Category & { subservicesCount: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getCategoriesWithCounts();

      if (response.success && response.data) {
        setCategories(response.data.categories || []);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories with counts:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}
