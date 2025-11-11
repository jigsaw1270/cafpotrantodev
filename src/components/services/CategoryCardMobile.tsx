'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryCardMobileProps {
  category: Category;
  subservicesCount?: number;
  className?: string;
  index?: number;
}

export default function CategoryCardMobile({
  category,
  subservicesCount,
  className = '',
  index = 0,
}: CategoryCardMobileProps) {
  const displayCount = subservicesCount ?? category.subservicesCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative ${className}`}
    >
      <Link href={`/services/${category.slug}`}>
        <div className="category-card-mobile">
          <div className="mobile-card-content">
            <h3 className="mobile-title font-family-general-sans">
              {category.name.length > 20
                ? `${category.name.substring(0, 20)}...`
                : category.name}
            </h3>
            <div className="services-count">
              <span>{displayCount} servizi disponibili</span>
            </div>
            <p className="mobile-description">
              {category.description && category.description.length > 80
                ? `${category.description.substring(0, 80)}... vedi di più`
                : category.description ||
                  'Scopri i nostri servizi in questa categoria'}
            </p>
            <div className="cta-button">
              <span>Esplora i servizi</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .category-card-mobile {
          width: 100%;
          max-width: 100%;
          min-width: 280px;
          height: 240px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #0f4c75 0%, #3282b8 100%);
          position: relative;
        }

        /* Background image overlay if available */
        .category-card-mobile::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: ${category.image?.url
            ? `url('${category.image.url}')`
            : 'none'};
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: ${category.image?.url ? 'grayscale(100%) blur(3px)' : 'none'};
          border-radius: 16px;
          z-index: 0;
          opacity: ${category.image?.url ? '1' : '0'};
        }

        /* Dark overlay for readability */
        .category-card-mobile::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${category.image?.url
            ? 'rgba(0, 0, 0, 0.7)'
            : 'transparent'};
          border-radius: 16px;
          z-index: 1;
        }

        .category-card-mobile:active {
          transform: scale(0.98);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
        }

        .mobile-card-content {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          z-index: 2;
          color: white;
        }

        .mobile-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
          line-height: 1.2;
        }

        .services-count {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          background: rgba(227, 195, 157, 0.2);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #e3c39d;
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(227, 195, 157, 0.3);
        }

        .mobile-description {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          text-align: center;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #e3c39d;
          padding: 8px 16px;
          border: 1px solid rgba(227, 195, 157, 0.3);
          border-radius: 8px;
          transition: all 0.3s ease;
          background: rgba(227, 195, 157, 0.05);
        }

        .category-card-mobile:active .cta-button {
          background: rgba(227, 195, 157, 0.15);
          transform: translateY(-1px);
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .category-card-mobile {
            min-width: 260px;
            height: 220px;
          }

          .mobile-card-content {
            padding: 20px;
          }

          .mobile-title {
            font-size: 18px;
          }

          .mobile-description {
            font-size: 13px;
          }

          .cta-button {
            font-size: 13px;
            padding: 6px 14px;
          }
        }

        @media (max-width: 360px) {
          .category-card-mobile {
            min-width: 240px;
            height: 200px;
          }

          .mobile-card-content {
            padding: 16px;
          }

          .mobile-title {
            font-size: 16px;
          }

          .mobile-description {
            font-size: 12px;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </motion.div>
  );
}
