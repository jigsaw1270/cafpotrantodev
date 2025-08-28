'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Users, Phone, MessageCircle, CreditCard, Banknote, Building } from 'lucide-react';
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
          const categoryResponse = await apiClient.getCategoryById(foundSubservice.categoryId);
          if (categoryResponse.success && categoryResponse.data) {
            setCategory(categoryResponse.data);
          }
        }

      } catch (err) {
        console.error('Error fetching subservice data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load subservice');
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
      months: 'mesi'
    };
    
    return `${duration.value} ${unitLabels[duration.unit as keyof typeof unitLabels] || duration.unit}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento servizio...</p>
        </div>
      </div>
    );
  }

  if (error || !subservice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Servizio non trovato</h1>
          <p className="text-gray-600 mb-6">{error || 'Il servizio richiesto non esiste.'}</p>
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
        title={`${subservice.name} - CafPotranto`}
        description={subservice.shortDescription || subservice.description}
        url={`/services/subservice/${subservice.slug}`}
      />

      {/* Back Navigation */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Service Title & Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {subservice.name}
                </h1>
                
                {/* Service Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {subservice.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{subservice.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({subservice.reviews_count} recensioni)</span>
                    </div>
                  )}
                  
                  {subservice.estimatedDuration && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      <span>Durata: {formatDuration(subservice.estimatedDuration)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Descrizione del Servizio</h2>
                <div className="prose prose-lg max-w-none">
                  {/* Rich text description */}
                  <div 
                    className="text-muted-foreground leading-relaxed prose"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(subservice.description) }}
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
                  <h3 className="text-xl font-bold text-foreground mb-4">Cosa include</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subservice.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-4 rounded-lg ${
                          feature.isIncluded ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.isIncluded ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <span className="text-white text-xs">
                            {feature.isIncluded ? '✓' : '✗'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{feature.name}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Requirements */}
              {subservice.requirements && subservice.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">Requisiti</h3>
                  <div className="space-y-3">
                    {subservice.requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-4 rounded-lg border ${
                          requirement.isRequired 
                            ? 'bg-orange-50 border-orange-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium ${
                          requirement.isRequired 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {requirement.isRequired ? 'Richiesto' : 'Opzionale'}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{requirement.name}</h4>
                          <p className="text-sm text-muted-foreground">{requirement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Payment & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6 text-accent-foreground">
                
                {/* Payment Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card border rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold mb-4">Dettagli di Pagamento</h3>
                  
                  <div className="space-y-3">
                    {/* Service Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Prezzo servizio:</span>
                      <span className="font-medium">
                        €{subservice.price_start.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Secretarial Fees */}
                    {subservice.secretarialFees && subservice.secretarialFees > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Oneri di segreteria:</span>
                        <span className="font-medium">
                          €{subservice.secretarialFees.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    {/* Subtotal */}
                    <div className="flex justify-between items-center py-2 border-t border-b">
                      <span className="font-medium">Subtotale:</span>
                      <span className="font-medium">
                        €{((subservice.secretarialFees || 0) + subservice.price_start).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* VAT */}
                    <div className="flex justify-between items-center">
                      <span className="text-md text-accent">VAT {subservice.vatPercentage || 22}%:</span>
                      <span className="font-medium">
                        €{(((subservice.secretarialFees || 0) + subservice.price_start) * ((subservice.vatPercentage || 22) / 100)).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Total */}
                    <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                      <span className="font-bold text-accent">Totale Ordine:</span>
                      <span className="font-bold text-accent text-lg">
                        €{(((subservice.secretarialFees || 0) + subservice.price_start) * (1 + ((subservice.vatPercentage || 22) / 100))).toFixed(2)}
                      </span>
                    </div>
                    
                    {subservice.estimatedDuration && (
                      <div className="flex justify-between items-center pt-3 mt-3 border-t">
                        <span className="text-muted-foreground text-sm">Durata stimata:</span>
                        <span className="font-medium text-sm">
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
                  className="bg-card border rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Opzioni di Pagamento</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Carta di Credito/Debito</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Bonifico Bancario</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <Banknote className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Contanti (in ufficio)</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    * Le opzioni di pagamento disponibili verranno confermate durante la consultazione
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
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors hidden md:flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Contatta via WhatsApp
                  </button>

                  {/* Phone Button */}
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    Chiama ora
                  </button>

                  {/* Request Quote Button */}
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-lg font-medium transition-colors">
                    Richiedi Preventivo
                  </button>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <h4 className="font-medium text-blue-900 mb-2">💡 Nota Importante</h4>
                  <p className="text-sm text-blue-800">
                    Per un preventivo accurato, ti consigliamo di contattarci per una consulenza gratuita 
                    in cui potremo valutare le tue esigenze specifiche.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      {subservice.tags && subservice.tags.length > 0 && (
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Tag correlati</h3>
            <div className="flex flex-wrap gap-2">
              {subservice.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
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
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
          aria-label="Contatta via WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
