'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
      className={`group relative overflow-hidden rounded-xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${className}`}
    >
      <Link href={`/services/${category.slug}`} className="block">
        {/* Background Card - Dark Navy Blue */}
        <div className="relative h-64 w-full bg-foreground flex items-center justify-center transition-all duration-500">
          
          {/* Background Image (Visible on mobile, hidden on desktop until hover) */}
          <div className="absolute inset-0 opacity-100 md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
            {category.image?.url ? (
              <Image
                src={category.image.url}
                alt={category.name}
                fill
                className="object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20" />
            )}
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Default State - Title Only (Hidden on mobile, visible on desktop until hover) */}
          <div className="relative z-10 px-6 text-center transition-all duration-500 opacity-0 md:opacity-100 md:group-hover:opacity-0">
            <h3 className="text-4xl uppercase md:text-2xl font-bold text-accent-foreground mb-2 leading-tight">
              {category.name}
            </h3>
          </div>

          {/* Detailed State - Full Details (Visible on mobile, hidden on desktop until hover) */}
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-center opacity-100 md:opacity-0 transition-all duration-500 md:group-hover:opacity-100">
            <motion.div
              initial={{ y: 20 }}
              className="text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-3 leading-tight">
                {category.name}
              </h3>
              
              <p className="text-gray-200 mb-4 text-sm leading-relaxed line-clamp-4">
                {category.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {displayCount} servizi
                </span>
                <div className="flex items-center gap-2 text-white font-medium">
                  <span>Esplora</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner accent (Visible on mobile, changes on desktop hover) */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-b-[30px] border-l-transparent border-b-primary md:border-b-primary/80 transition-all duration-300 md:group-hover:border-b-primary"></div>
        </div>
      </Link>
    </motion.div>
  );
}
