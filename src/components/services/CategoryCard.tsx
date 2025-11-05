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

export default function CategoryCard({
  category,
  subservicesCount,
  className = '',
}: CategoryCardProps) {
  const displayCount = subservicesCount ?? category.subservicesCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <Link href={`/services/${category.slug}`} className="block">
        {/* Background Card */}
        <div className="relative flex h-72 w-full items-center justify-center border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
            {category.image?.url ? (
              <Image
                src={category.image.url}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 p-6 text-center">
            <motion.div
              initial={{ y: 20 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-new-navy group-hover:text-dark-teal mb-3 text-2xl font-bold transition-colors duration-300">
                {category.name}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                {category.description}
              </p>

              <div className="mb-4 flex items-center justify-between text-xs">
                <span className="bg-light-teal rounded-full px-3 py-1 font-medium text-white">
                  {displayCount} servizi
                </span>
                <div className="text-dark-teal group-hover:text-light-teal flex items-center gap-1 font-medium transition-colors duration-300">
                  <span>Vedi tutto</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
