'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Star,
  Users,
  Phone,
  MessageCircle,
  CreditCard,
  Banknote,
  Building,
} from 'lucide-react';
import Link from 'next/link';
import { SEO } from '@/components/seo';
import { Subservice, Category } from '@/lib/types';
import { markdownToHtml } from '@/lib/markdown';
import apiClient from '@/lib/api';

export default function SubservicePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [subservice, setSubservice] = useState<Subservice | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubserviceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the new slug-based endpoint for better performance
        const subserviceResponse = await apiClient.getSubserviceBySlug(slug);

        if (!subserviceResponse.success || !subserviceResponse.data) {
          throw new Error('Failed to fetch subservice');
        }

        const foundSubservice = subserviceResponse.data.subservice;
        setSubservice(foundSubservice);

        // Get the category details
        if (foundSubservice.categoryId) {
          const categoryResponse = await apiClient.getCategoryById(
            foundSubservice.categoryId
          );
          if (categoryResponse.success && categoryResponse.data) {
            setCategory(categoryResponse.data);
          }
        }
      } catch (err) {
        console.error('Error fetching subservice data:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load subservice'
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSubserviceData();
    }
  }, [slug]);

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
          <p className="text-gray-600">Caricamento servizio...</p>
        </div>
      </div>
    );
  }

  if (error || !subservice) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Servizio non trovato
          </h1>
          <p className="mb-6 text-gray-600">
            {error || 'Il servizio richiesto non esiste.'}
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
        title={`${subservice.name} - CafPotranto`}
        description={subservice.shortDescription || subservice.description}
        url={`/services/subservice/${subservice.slug}`}
      />

      {/* Back Navigation */}
      <div className="container mx-auto px-8 pt-6 lg:px-12">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Link
            href="/services"
            className="hover:text-primary transition-colors"
          >
            Servizi
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/services/${category.slug}`}
                className="hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{subservice.name}</span>
        </div>
      </div>

      {/* Service Header */}
      <section className="py-12">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Title & Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                  {subservice.name}
                </h1>

                {/* Service Meta */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  {subservice.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-current text-yellow-500" />
                      <span className="font-medium">
                        {subservice.rating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({subservice.reviews_count} recensioni)
                      </span>
                    </div>
                  )}

                  {subservice.estimatedDuration && (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>
                        Durata: {formatDuration(subservice.estimatedDuration)}
                      </span>
                    </div>
                  )}

                  <div className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Categoria: {category?.name || 'N/A'}</span>
                  </div>
                </div>
              </motion.div>

              {/* Service Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-foreground mb-4 text-2xl font-bold">
                  Descrizione del Servizio
                </h2>
                <div className="prose prose-lg max-w-none">
                  {/* Rich text description */}
                  <div
                    className="text-muted-foreground prose leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(subservice.description),
                    }}
                  />
                </div>
              </motion.div>

              {/* Service Features */}
              {subservice.features && subservice.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-foreground mb-4 text-xl font-bold">
                    Cosa include
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {subservice.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 rounded-lg p-4 ${
                          feature.isIncluded
                            ? 'border border-green-200 bg-green-50'
                            : 'border border-red-200 bg-red-50'
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                            feature.isIncluded ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          <span className="text-xs text-white">
                            {feature.isIncluded ? '✓' : '✗'}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium">
                            {feature.name}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Requirements */}
              {subservice.requirements &&
                subservice.requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-foreground mb-4 text-xl font-bold">
                      Requisiti
                    </h3>
                    <div className="space-y-3">
                      {subservice.requirements.map((requirement, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 rounded-lg border p-4 ${
                            requirement.isRequired
                              ? 'border-orange-200 bg-orange-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 rounded px-2 py-1 text-xs font-medium ${
                              requirement.isRequired
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-500 text-white'
                            }`}
                          >
                            {requirement.isRequired ? 'Richiesto' : 'Opzionale'}
                          </div>
                          <div>
                            <h4 className="text-foreground font-medium">
                              {requirement.name}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {requirement.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
            </div>

            {/* Sidebar - Payment & Contact */}
            <div className="lg:col-span-1">
              <div className="text-accent-foreground sticky top-6 space-y-6">
                {/* Payment Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card rounded-xl border p-6 shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-bold">
                    Dettagli di Pagamento
                  </h3>

                  <div className="space-y-3">
                    {/* Service Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Prezzo servizio:</span>
                      <span className="font-medium">
                        €{subservice.price_start.toFixed(2)}
                      </span>
                    </div>

                    {/* Secretarial Fees */}
                    {subservice.secretarialFees &&
                      subservice.secretarialFees > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Oneri di segreteria:</span>
                          <span className="font-medium">
                            €{subservice.secretarialFees.toFixed(2)}
                          </span>
                        </div>
                      )}

                    {/* Subtotal */}
                    <div className="flex items-center justify-between border-t border-b py-2">
                      <span className="font-medium">Subtotale:</span>
                      <span className="font-medium">
                        €
                        {(
                          (subservice.secretarialFees || 0) +
                          subservice.price_start
                        ).toFixed(2)}
                      </span>
                    </div>

                    {/* VAT */}
                    <div className="flex items-center justify-between">
                      <span className="text-md text-accent">
                        VAT {subservice.vatPercentage || 22}%:
                      </span>
                      <span className="font-medium">
                        €
                        {(
                          ((subservice.secretarialFees || 0) +
                            subservice.price_start) *
                          ((subservice.vatPercentage || 22) / 100)
                        ).toFixed(2)}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="border-primary/20 flex items-center justify-between border-t pt-2">
                      <span className="text-accent font-bold">
                        Totale Ordine:
                      </span>
                      <span className="text-accent text-lg font-bold">
                        €
                        {(
                          ((subservice.secretarialFees || 0) +
                            subservice.price_start) *
                          (1 + (subservice.vatPercentage || 22) / 100)
                        ).toFixed(2)}
                      </span>
                    </div>

                    {subservice.estimatedDuration && (
                      <div className="mt-3 flex items-center justify-between border-t pt-3">
                        <span className="text-accent text-sm">
                          Durata stimata:
                        </span>
                        <span className="text-sm font-medium">
                          {formatDuration(subservice.estimatedDuration)}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Payment Options Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card rounded-xl border p-6 shadow-sm"
                >
                  <h3 className="text-foreground mb-4 text-lg font-bold">
                    Opzioni di Pagamento
                  </h3>

                  <div className="space-y-3">
                    <div className="bg-secondary/30 flex items-center gap-3 rounded-lg p-3">
                      <CreditCard className="text-primary h-5 w-5" />
                      <span className="text-sm font-medium">
                        Carta di Credito/Debito
                      </span>
                    </div>

                    <div className="bg-secondary/30 flex items-center gap-3 rounded-lg p-3">
                      <Building className="text-primary h-5 w-5" />
                      <span className="text-sm font-medium">
                        Bonifico Bancario
                      </span>
                    </div>

                    <div className="bg-secondary/30 flex items-center gap-3 rounded-lg p-3">
                      <Banknote className="text-primary h-5 w-5" />
                      <span className="text-sm font-medium">
                        Contanti (in ufficio)
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-4 text-xs">
                    * Le opzioni di pagamento disponibili verranno confermate
                    durante la consultazione
                  </p>
                </motion.div>

                {/* Contact Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-3"
                >
                  {/* WhatsApp Button - Hidden on mobile (shown as floating) */}
                  <button className="hidden w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:bg-green-600 md:flex">
                    <MessageCircle className="h-5 w-5" />
                    Contatta via WhatsApp
                  </button>

                  {/* Phone Button */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600">
                    <Phone className="h-5 w-5" />
                    Chiama ora
                  </button>

                  {/* Request Now Button */}
                  <Link
                    href={`/services/subservice/${slug}/checkout`}
                    className="bg-primary hover:bg-accent/90 text-background hover:text-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors"
                  >
                    Richiedi ora
                  </Link>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="rounded-lg border border-blue-200 bg-blue-50 p-4"
                >
                  <h4 className="mb-2 font-medium text-blue-900">
                    💡 Nota Importante
                  </h4>
                  <p className="text-sm text-blue-800">
                    Per un preventivo accurato, ti consigliamo di contattarci
                    per una consulenza gratuita in cui potremo valutare le tue
                    esigenze specifiche.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      {subservice.tags && subservice.tags.length > 0 && (
        <section className="bg-secondary/20 py-8">
          <div className="container mx-auto px-4">
            <h3 className="text-foreground mb-4 text-lg font-bold">
              Tag correlati
            </h3>
            <div className="flex flex-wrap gap-2">
              {subservice.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Floating WhatsApp Button */}
      <div className="md:hidden">
        <button
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
          aria-label="Contatta via WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
