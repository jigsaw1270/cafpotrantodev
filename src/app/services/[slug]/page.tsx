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
        const categoriesResponse = await apiClient.getCategories({
          active: true,
          limit: 100,
        });

        if (!categoriesResponse.success || !categoriesResponse.data) {
          throw new Error('Failed to fetch categories');
        }

        const foundCategory = categoriesResponse.data.categories.find(
          cat => cat.slug === slug
        );

        if (!foundCategory) {
          throw new Error('Category not found');
        }

        setCategory(foundCategory);

        // Then get subservices for this category
        const subservicesResponse = await apiClient.getSubservicesByCategory(
          foundCategory._id,
          {
            active: true,
            limit: 100,
            sortBy: 'displayOrder',
            sortOrder: 'asc',
          }
        );

        if (subservicesResponse.success && subservicesResponse.data) {
          setSubservices(subservicesResponse.data.subservices || []);
        }
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load category'
        );
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
      months: 'mesi',
    };

    return `${duration.value} ${unitLabels[duration.unit as keyof typeof unitLabels] || duration.unit}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Caricamento categoria...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground mb-4 text-2xl font-bold">
            Categoria non trovata
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || 'La categoria richiesta non esiste.'}
          </p>
          <Link
            href="/services"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
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
      <section className="py-16">
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
                <motion.div
                  key={subservice._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true }}
                  className="group rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
                    border: 'none',
                    color: '#142850',
                  }}
                >
                  <Link
                    href={`/services/subservice/${subservice.slug}`}
                    className="block h-full p-6"
                  >
                    {/* Service Header */}
                    <div className="mb-4">
                      <h3 className="text-accent-foreground line-clamp-2 text-xl font-semibold transition-colors group-hover:text-white">
                        {subservice.name}
                      </h3>

                      {subservice.rating > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="text-muted-foreground text-sm">
                            {subservice.rating.toFixed(1)} (
                            {subservice.reviews_count} recensioni)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Service Description */}
                    <p className="text-accent-foreground mb-4 line-clamp-3 text-sm">
                      {subservice.shortDescription || subservice.description}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-3">
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4 text-white" />
                        <span className="font-semibold text-white">
                          {formatPrice(
                            subservice.price_start,
                            subservice.priceType
                          )}
                        </span>
                      </div>

                      {/* Duration */}
                      {subservice.estimatedDuration && (
                        <div className="flex items-center gap-2">
                          <Clock className="text-muted-foreground h-4 w-4" />
                          <span className="text-muted-foreground text-sm">
                            Durata stimata:{' '}
                            {formatDuration(subservice.estimatedDuration)}
                          </span>
                        </div>
                      )}

                      {/* Tags */}
                      {subservice.tags && subservice.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {subservice.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-secondary/50 text-secondary-foreground inline-block rounded-full px-2 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {subservice.tags.length > 3 && (
                            <span className="text-muted-foreground text-xs">
                              +{subservice.tags.length - 3} altri
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 border-t pt-4">
                      <div className="bg-primary text-primary-foreground hover:bg-popover border-popover w-full rounded-lg border-2 py-2 text-center text-sm font-medium transition-colors">
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
