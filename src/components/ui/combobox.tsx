'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import apiClient from '@/lib/api';

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
  placeholder = "Search services...", 
  className 
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const performSearch = async (query: string) => {
    try {
      setLoading(true);
      
      // Search both categories and subservices
      const [categoriesResponse, subservicesResponse] = await Promise.all([
        apiClient.getCategories({ search: query, active: true, limit: 10 }),
        apiClient.getSubservices({ search: query, active: true, limit: 15 })
      ]);

      const searchResults: SearchResult[] = [];

      // Add categories to results
      if (categoriesResponse.success && categoriesResponse.data?.categories) {
        categoriesResponse.data.categories.forEach(category => {
          searchResults.push({
            type: 'category',
            id: category._id,
            name: category.name,
            slug: category.slug,
            description: category.description
          });
        });
      }

      // Add subservices to results
      if (subservicesResponse.success && subservicesResponse.data?.subservices) {
        subservicesResponse.data.subservices.forEach(subservice => {
          searchResults.push({
            type: 'subservice',
            id: subservice._id,
            name: subservice.name,
            slug: subservice.slug,
            description: subservice.shortDescription || subservice.description,
            categoryName: (subservice.categoryId as any)?.name || 'Unknown Category'
          });
        });
      }

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

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
      if (inputRef.current && !inputRef.current.closest('.search-container')?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative w-full search-container", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full rounded-lg border border-input bg-background px-10 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {open && (searchTerm.trim() || results.length > 0) && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-accent text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="p-2">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="relative flex cursor-pointer select-none items-start rounded-sm px-2 py-2 text-sm outline-none hover:bg-background "
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex-1 ">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          result.type === 'category' 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        )}>
                          {result.type === 'category' ? 'Category' : 'Service'}
                        </span>
                        <span className="font-medium text-foreground">{result.name}</span>
                      </div>
                      {result.description && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                      )}
                      {result.categoryName && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          in {result.categoryName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm.trim() ? (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                No results found for "{searchTerm}"
              </div>
            ) : (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                Start typing to search services...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
