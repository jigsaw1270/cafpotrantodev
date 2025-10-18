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
      className={`group relative overflow-hidden rounded-xl shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${className}`}
    >
      <Link href={`/services/${category.slug}`} className="block">
        {/* Background Card - Dark Navy Blue */}
        <div className="bg-purple relative flex h-64 w-full items-center justify-center transition-all duration-500">
          {/* Background Image (Visible on mobile, hidden on desktop until hover) */}
          <div className="absolute inset-0 opacity-100 blur-[4px] transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
            {category.image?.url ? (
              <Image
                src={category.image.url}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="from-primary/20 to-secondary/20 h-full w-full bg-gradient-to-br" />
            )}

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Default State - Title Only (Hidden on mobile, visible on desktop until hover) */}
          <div className="relative z-10 px-6 text-center opacity-0 transition-all duration-500 md:opacity-100 md:group-hover:opacity-0">
            <h3 className="text-accent-foreground mb-2 text-4xl leading-tight font-bold uppercase md:text-2xl">
              {category.name}
            </h3>
          </div>

          {/* Detailed State - Full Details (Visible on mobile, hidden on desktop until hover) */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 opacity-100 transition-all duration-500 md:opacity-0 md:group-hover:opacity-100">
            <motion.div initial={{ y: 20 }} className="text-center text-white">
              <h3 className="shadow-accent mb-3 text-2xl leading-tight font-bold lg:text-3xl">
                {category.name}
              </h3>

              <p className="text-md mb-4 line-clamp-4 leading-relaxed text-white">
                {category.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {displayCount} servizi
                </span>
                <div className="flex items-center gap-2 font-medium text-white">
                  <span>Esplora</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner accent (Visible on mobile, changes on desktop hover) */}
          <div className="border-b-primary md:border-b-primary/80 md:group-hover:border-b-primary absolute top-0 right-0 h-0 w-0 border-b-[30px] border-l-[30px] border-l-transparent transition-all duration-300"></div>
        </div>
      </Link>
    </motion.div>
  );
}
