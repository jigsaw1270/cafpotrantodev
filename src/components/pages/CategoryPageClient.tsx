'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { Category, Subservice } from '@/lib/types';
import SubserviceCard from '@/components/services/SubserviceCard';

interface CategoryPageClientProps {
  category: Category;
  subservices: Subservice[];
  slug: string;
}

export default function CategoryPageClient({
  category,
  subservices,
}: CategoryPageClientProps) {
  return (
    <>
      {/* Back Navigation */}
      <div className="container mx-auto bg-cyan-100 px-8 pt-6 lg:px-12">
        <Link
          href="/services"
          className="text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna ai servizi
        </Link>
      </div>

      {/* Category Banner */}
      <section className="from-background via-cyan to-background relative overflow-hidden bg-gradient-to-br py-16">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Category Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-foreground mb-6 text-4xl font-bold lg:text-5xl">
                {category.name}
              </h1>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {category.description}
              </p>

              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {subservices.length} servizi disponibili
                </span>
              </div>
            </motion.div>

            {/* Category Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-80 w-full overflow-hidden rounded-2xl shadow-xl lg:h-[3/4dvh]"
            >
              {category.image?.url ? (
                <Image
                  src={category.image.url}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  className="object-none"
                  priority
                />
              ) : (
                <div className="from-primary/20 to-secondary/20 flex h-full w-full items-center justify-center bg-gradient-to-br">
                  <FileText className="text-primary/40 h-24 w-24" />
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subservices Grid */}
      <section className="grad-up-navy py-16">
        <div className="container mx-auto px-8 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold">
              I nostri servizi
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Scopri tutti i servizi disponibili nella categoria {category.name}
            </p>
          </motion.div>

          {/* Subservices Grid */}
          {subservices.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {subservices.map((subservice, index) => (
                <SubserviceCard
                  key={subservice._id}
                  subservice={subservice}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="py-12 text-center"
            >
              <FileText className="text-muted-foreground/40 mx-auto mb-4 h-16 w-16" />
              <h3 className="text-foreground mb-2 text-lg font-medium">
                Nessun servizio disponibile
              </h3>
              <p className="text-muted-foreground">
                Al momento non ci sono servizi disponibili in questa categoria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
