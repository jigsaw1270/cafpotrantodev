'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeroBannerProps {
  imageUrl: string;
  imageAlt: string;
  title: React.ReactNode;
  subtitle: string;
  description: string;
  children?: React.ReactNode;
}

export function HeroBanner({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  children,
}: HeroBannerProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative min-h-[500px] overflow-hidden py-24 md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      {!imageError ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
          onError={() => setImageError(true)}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRmIAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=="
        />
      ) : (
        // Fallback gradient background if image fails to load
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400" />
      )}

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[500px] items-center px-8 md:min-h-[600px] lg:min-h-[700px] lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-2xl font-semibold text-white"
          >
            {subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-xl leading-relaxed text-white opacity-90"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
