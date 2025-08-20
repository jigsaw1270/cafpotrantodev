'use client';

import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { useCategoriesWithCounts } from '@/hooks/useCategories';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface CategoriesGridProps {
  className?: string;
}

export function CategoriesGrid({ className = '' }: CategoriesGridProps) {
  const { categories, loading, error, refetch } = useCategoriesWithCounts();

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-gray-900 font-medium mb-2">Failed to load categories</p>
        <p className="text-gray-600 text-sm mb-4">{error}</p>
        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <p className="text-gray-900 font-medium mb-2">No categories available</p>
        <p className="text-gray-600 text-sm">Categories will appear here once they are added.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
              ease: "easeOut"
            }}
          >
            <CategoryCard
              category={category}
              subservicesCount={category.subservicesCount}
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
        <p className="text-gray-600">
          Showing {categories.length} service {categories.length === 1 ? 'category' : 'categories'}
        </p>
      </motion.div>
    </div>
  );
}

export default CategoriesGrid;
