'use client';

import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { useCategories } from '@/hooks/useServicesData';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { CategoriesGridSkeleton } from '@/components/ui/skeletons/CategorySkeleton';

interface CategoriesGridProps {
  className?: string;
}

export function CategoriesGrid({ className = '' }: CategoriesGridProps) {
  const { categories, error, isLoading, refetch } = useCategories();

  if (isLoading) {
    return (
      <div className={className}>
        <CategoriesGridSkeleton />
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
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
          >
            <CategoryCard
              category={category}
              subservicesCount={category.subservicesCount || 0}
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
        <p className="text-muted-foreground">
          Showing {categories.length} service{' '}
          {categories.length === 1 ? 'category' : 'categories'}
        </p>
      </motion.div>
    </div>
  );
}

export default CategoriesGrid;
