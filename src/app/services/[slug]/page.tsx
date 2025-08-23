'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, FileText, Euro, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { SEO } from '@/components/seo';
import { Category, Subservice } from '@/lib/types';
import apiClient from '@/lib/api';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [subservices, setSubservices] = useState<Subservice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, get all categories to find the one with this slug
        const categoriesResponse = await apiClient.getCategories({ active: true, limit: 100 });
        
        if (!categoriesResponse.success || !categoriesResponse.data) {
          throw new Error('Failed to fetch categories');
        }

        const foundCategory = categoriesResponse.data.categories.find(cat => cat.slug === slug);
        
        if (!foundCategory) {
          throw new Error('Category not found');
        }

        setCategory(foundCategory);

        // Then get subservices for this category
        const subservicesResponse = await apiClient.getSubservicesByCategory(foundCategory._id, {
          active: true,
          limit: 100,
          sortBy: 'displayOrder',
          sortOrder: 'asc'
        });

        if (subservicesResponse.success && subservicesResponse.data) {
          setSubservices(subservicesResponse.data.subservices || []);
        }

      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  const formatPrice = (price: number, priceType: string) => {
    const formatted = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);

    switch (priceType) {
      case 'starting_from':
        return `A partire da ${formatted}`;
      case 'hourly':
        return `${formatted}/ora`;
      case 'consultation':
        return `${formatted} (consulenza)`;
      default:
        return formatted;
    }
  };

  const formatDuration = (duration?: { value: number; unit: string }) => {
    if (!duration) return null;
    
    const unitLabels = {
      hours: 'ore',
      days: 'giorni',
      weeks: 'settimane',
      months: 'mesi'
    };
    
    return `${duration.value} ${unitLabels[duration.unit as keyof typeof unitLabels] || duration.unit}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Caricamento categoria...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Categoria non trovata</h1>
          <p className="text-muted-foreground mb-6">{error || 'La categoria richiesta non esiste.'}</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai servizi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${category.name} - CafPotranto`}
        description={category.description}
        url={`/services/${category.slug}`}
      />

      {/* Back Navigation */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna ai servizi
        </Link>
      </div>

      {/* Category Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Category Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {category.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              {category.image?.url ? (
                <Image
                  src={category.image.url}
                  alt={category.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <FileText className="h-24 w-24 text-primary/40" />
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subservices Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              I nostri servizi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scopri tutti i servizi disponibili nella categoria {category.name}
            </p>
          </motion.div>

          {/* Subservices Grid */}
          {subservices.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {subservices.map((subservice, index) => (
                  <motion.div
                  key={subservice._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="group bg-card border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href={`/services/subservice/${subservice.slug}`} className="block p-6 h-full">
                  
                    {/* Service Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {subservice.name}
                      </h3>
                      
                      {subservice.rating > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">
                            {subservice.rating.toFixed(1)} ({subservice.reviews_count} recensioni)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Service Description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {subservice.shortDescription || subservice.description}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-3">
                      
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-primary">
                          {formatPrice(subservice.price_start, subservice.priceType)}
                        </span>
                      </div>

                      {/* Duration */}
                      {subservice.estimatedDuration && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Durata stimata: {formatDuration(subservice.estimatedDuration)}
                          </span>
                        </div>
                      )}

                      {/* Tags */}
                      {subservice.tags && subservice.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {subservice.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-block px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {subservice.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{subservice.tags.length - 3} altri
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium text-center">
                        Scopri di più
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
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
