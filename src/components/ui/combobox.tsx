'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import apiClient from '@/lib/api';
import Loader from '@/components/ui/loader';

interface SearchResult {
  type: 'category' | 'subservice';
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryName?: string; // For subservices
}

interface ComboboxProps {
  placeholder?: string;
  className?: string;
}

export function Combobox({
  placeholder = 'Cerca servizi...',
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const performSearch = useCallback(
    async (query: string) => {
      try {
        setLoading(true);

        // Search both categories and subservices
        const [categoriesResponse, subservicesResponse] = await Promise.all([
          apiClient.getCategories({ search: query, active: true, limit: 10 }),
          apiClient.getSubservices({ search: query, active: true, limit: 15 }),
        ]);

        // Check if component is still mounted and search term hasn't changed
        if (searchTerm !== query) {
          return; // Abort if search term has changed
        }

        const searchResults: SearchResult[] = [];

        // Add categories to results
        if (categoriesResponse.success && categoriesResponse.data?.categories) {
          categoriesResponse.data.categories.forEach(category => {
            searchResults.push({
              type: 'category',
              id: category._id,
              name: category.name,
              slug: category.slug,
              description: category.description,
            });
          });
        }

        // Add subservices to results
        if (
          subservicesResponse.success &&
          subservicesResponse.data?.subservices
        ) {
          subservicesResponse.data.subservices.forEach(subservice => {
            searchResults.push({
              type: 'subservice',
              id: subservice._id,
              name: subservice.name,
              slug: subservice.slug,
              description:
                subservice.shortDescription || subservice.description,
              categoryName:
                (subservice.categoryId as any)?.name || 'Unknown Category',
            });
          });
        }

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        if (searchTerm === query) {
          setResults([]);
        }
      } finally {
        if (searchTerm === query) {
          setLoading(false);
        }
      }
    },
    [searchTerm]
  );

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm);
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(delayedSearch);
    };
  }, [searchTerm, performSearch]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'category') {
      router.push(`/services/${result.slug}`);
    } else {
      router.push(`/services/subservice/${result.slug}`);
    }

    setOpen(false);
    setSearchTerm('');
    setResults([]);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = document.querySelector('.search-container');
      if (container && !container.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open]);

  return (
    <div className={cn('search-container relative w-full', className)}>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (!open) setOpen(true);
          }}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-10 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {open && (
        <div
          key="search-dropdown"
          className="bg-destructive text-popover-foreground search-dropdown absolute top-full z-50 mt-1 w-full rounded-md border shadow-md transition-all duration-300"
        >
          <div className="p-2">
            {loading ? (
              <div
                key="loading"
                className="flex items-center justify-center py-4"
              >
                <Loader size="small" />
              </div>
            ) : results.length > 0 ? (
              <div key="results" className="space-y-1">
                {results.map(result => (
                  <div
                    key={`${result.type}-${result.id}-${result.slug}`}
                    className="hover:bg-background relative flex cursor-pointer items-start rounded-sm border-b-2 border-indigo-200 px-2 py-2 text-sm outline-none select-none"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium italic',
                            result.type === 'category'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          )}
                        >
                          {result.type === 'category'
                            ? 'categoria'
                            : 'servizio'}
                        </span>
                        <span className="text-foreground font-medium">
                          {result.name}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                          {result.description}
                        </p>
                      )}
                      {result.categoryName && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          nel {result.categoryName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm.trim() ? (
              <div
                key="no-results"
                className="text-muted-foreground px-2 py-4 text-center text-sm"
              >
                Nessun risultato trovato per "{searchTerm}"
              </div>
            ) : (
              <div
                key="empty-state"
                className="text-muted-foreground px-2 py-4 text-center text-sm"
              >
                Inizia a digitare per cercare i servizi...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
