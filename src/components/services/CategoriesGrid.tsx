'use client';

import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { useCategories } from '@/hooks/useServicesData';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Loader from '@/components/ui/loader';

interface CategoriesGridProps {
  className?: string;
}

export function CategoriesGrid({ className = '' }: CategoriesGridProps) {
  const { categories, error, isLoading, refetch } = useCategories();

  // Function to determine grid columns based on category count
  const getGridColumns = (count: number) => {
    if (count === 2) {
      return 'grid-cols-1 md:grid-cols-2'; // 2 columns for desktop, 1 for mobile
    } else if (count === 3 || count === 6) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // 3 columns for desktop, responsive for smaller screens
    } else if (count >= 8) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'; // 4 columns for extra large screens
    } else {
      // Default case for other numbers (1, 4, 5, 7, etc.)
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // Default to 3 columns
    }
  };

  if (isLoading) {
    return (
      <div
        className={`bg-purple flex items-center justify-center rounded-xl py-12 ${className}`}
      >
        <Loader size="large" centered />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
      >
        <AlertCircle className="mb-4 h-8 w-8 text-red-500" />
        <p className="text-foreground mb-2 font-medium">
          Failed to load categories
        </p>
        <p className="text-muted-foreground mb-4 text-sm">{error}</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
      >
        <p className="text-foreground mb-2 font-medium">
          No categories available
        </p>
        <p className="text-muted-foreground text-sm">
          Categories will appear here once they are added.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div
        className={`grid gap-6 ${getGridColumns(categories.length)} place-items-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            className="flex w-full justify-center"
          >
            <CategoryCard
              category={category}
              subservicesCount={category.subservicesCount || 0}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Additional info section */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-muted-foreground hidden">
          Showing {categories.length} service{' '}
          {categories.length === 1 ? 'category' : 'categories'}
        </p>
      </motion.div>
    </div>
  );
}

export default CategoriesGrid;
