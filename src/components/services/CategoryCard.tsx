'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  subservicesCount?: number;
  className?: string;
  index?: number;
}

export default function CategoryCard({
  category,
  subservicesCount,
  className = '',
  index = 0,
}: CategoryCardProps) {
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
        <div className="category-card">
          <div className="card-content">
            {/* Front side */}
            <div
              className={`front-side ${category.image?.url ? 'has-image' : ''}`}
            >
              <div className="animated-border">
                <div className="border-line border-line-top"></div>
                <div className="border-line border-line-right"></div>
                <div className="border-line border-line-bottom"></div>
                <div className="border-line border-line-left"></div>
              </div>

              <div className="front-content">
                <div className="front-title-container">
                  <h3 className="front-title font-family-general-sans">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Back side */}
            <div className="back-side">
              <div className="back-content">
                <div className="back-icon">
                  <FileText />
                </div>
                <h3 className="back-title font-family-general-sans">
                  {category.name}
                </h3>
                <div className="services-count-back">
                  <span>
                    {subservicesCount ?? category.subservicesCount ?? 0} servizi
                    disponibili
                  </span>
                </div>
                <p className="back-description">{category.description}</p>
                <div className="cta-text">
                  <span>Esplora i servizi</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .category-card {
          overflow: visible;
          width: 350px;
          height: 280px;
          perspective: 1000px;
          cursor: pointer;
        }

        .card-content {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .category-card:hover .card-content {
          transform: rotateY(180deg);
        }

        .front-side,
        .back-side {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
        }

        .front-side {
          color: white;
          position: relative;
          background: linear-gradient(135deg, #071739 0%, #4b6382 100%);
        }

        .front-side.has-image {
          background-image: url('${category.image?.url || ''}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .front-side::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to top,
            rgba(7, 23, 57, 0.6) 0%,
            rgba(7, 23, 57, 0.3) 50%,
            rgba(7, 23, 57, 0.1) 80%,
            transparent 100%
          );
          border-radius: 16px;
          z-index: 1;
        }

        .back-side {
          background: linear-gradient(135deg, #0f4c75 0%, #3282b8 100%);
          color: white;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Animated border for front side */
        .animated-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          border-radius: 16px;
        }

        .border-line {
          position: absolute;
          background: linear-gradient(
            90deg,
            transparent,
            #3282b8,
            #e3c39d,
            #3282b8,
            transparent
          );
        }

        .border-line-top {
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          animation: borderSlideHorizontal 3s infinite linear;
          animation-delay: 0s;
        }

        .border-line-right {
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent,
            #3282b8,
            #e3c39d,
            #3282b8,
            transparent
          );
          animation: borderSlideVertical 3s infinite linear;
          animation-delay: 0.75s;
        }

        .border-line-bottom {
          bottom: 0;
          right: 0;
          width: 100%;
          height: 4px;
          animation: borderSlideHorizontalReverse 3s infinite linear;
          animation-delay: 1.5s;
        }

        .border-line-left {
          bottom: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent,
            #3282b8,
            #e3c39d,
            #3282b8,
            transparent
          );
          animation: borderSlideVerticalReverse 3s infinite linear;
          animation-delay: 2.25s;
        }

        @keyframes borderSlideHorizontal {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes borderSlideHorizontalReverse {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes borderSlideVertical {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes borderSlideVerticalReverse {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        /* Content styling */
        .front-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 1;
        }

        .front-title-container {
          position: relative;
          padding: 24px;
          z-index: 2;
        }

        .front-title {
          font-size: 24px;
          font-weight: 700;
          color: white;
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .back-content {
          position: absolute;
          top: 5%;
          left: 5%;
          width: 90%;
          height: 90%;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(10px);
          box-sizing: border-box;
        }

        .back-icon {
          width: 48px;
          height: 48px;
          color: #e3c39d;
          margin-bottom: 16px;
        }

        .back-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
        }

        .services-count-back {
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

        .back-description {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          text-align: center;
        }

        .cta-text {
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
        }

        .category-card:hover .cta-text {
          background: rgba(227, 195, 157, 0.1);
          transform: translateY(-2px);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .category-card {
            width: 100%;
            max-width: 320px;
            height: 240px;
          }

          .front-title-container {
            padding: 20px;
          }

          .front-title {
            font-size: 20px;
          }

          .back-content {
            padding: 20px;
          }

          .back-title {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .category-card {
            max-width: 280px;
            height: 220px;
          }

          .front-title {
            font-size: 18px;
          }

          .back-title {
            font-size: 16px;
          }

          .back-description {
            font-size: 13px;
          }
        }
      `}</style>
    </motion.div>
  );
}
