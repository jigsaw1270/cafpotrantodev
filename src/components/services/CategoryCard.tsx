'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  subservicesCount?: number;
  className?: string;
}

export default function CategoryCard({ category, subservicesCount, className = '' }: CategoryCardProps) {
  const displayCount = subservicesCount ?? category.subservicesCount ?? 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <Link href={`/services/${category.slug}`} className="block">
        {/* Category Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          {category.image?.url ? (
            <Image
              src={category.image.url}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileText className="h-16 w-16 text-primary/40" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
              {category.name}
            </h3>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
          </div>
          
          <p className="mb-4 text-muted-foreground line-clamp-3">
            {category.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {displayCount} servizi disponibili
            </span>
            <span className="text-primary font-medium">
              Scopri di più →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
