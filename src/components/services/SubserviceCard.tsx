'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { Subservice } from '@/lib/types';

interface SubserviceCardProps {
  subservice: Subservice;
  index?: number;
}

const StyledWrapper = styled.div`
  .card-title {
    color: #ffffff;
    font-size: 1.4em;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 0.8em;
    height: 3.2em; /* Fixed height for 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all 0.5s ease-out;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .price-section {
    margin-bottom: 1rem;
  }

  .price-amount {
    color: #00bcd4;
    font-size: 1.2em;
    font-weight: 800;
    line-height: 1.2;
    transition: all 0.5s ease-out;
    display: block;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .divider-line {
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.3),
      rgba(0, 188, 212, 0.5)
    );
    border-radius: 1px;
    margin: 1rem 0;
    opacity: 0.8;
    transition: all 0.5s ease-out;
  }

  .details-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .service-details {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1; /* Take available space */
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85em;
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.5s ease-out;
  }

  .detail-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: #00bcd4;
  }

  .star-filled {
    fill: #fbbf24;
    color: #fbbf24;
  }

  .detail-text {
    font-weight: 500;
    flex: 1;
    color: rgba(255, 255, 255, 0.85);
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: auto; /* Always stick to bottom */
    padding-top: 0.8rem;
    min-height: 2em; /* Fixed space for tags */
    align-items: flex-end;
  }

  .tag,
  .tag-more {
    background: rgba(0, 188, 212, 0.2);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 188, 212, 0.3);
    color: rgba(255, 255, 255, 0.9);
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.7em;
    font-weight: 500;
    transition: all 0.5s ease-out;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2em;
    height: 2em;
    overflow: hidden;
    top: 0;
    right: 0;
    background: linear-gradient(135deg, #00bcd4, #0f4c75);
    border-radius: 0 16px 0 32px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    width: 16px;
    height: 16px;
  }

  .card {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 380px; /* Fixed height for all cards */
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 2em 1.2em;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .card:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: linear-gradient(135deg, #00bcd4, #0f4c75);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.35s ease-out;
    backdrop-filter: blur(8px);
  }

  .card:hover:before {
    transform: scale(28);
  }

  .card:hover .card-title {
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .card:hover .price-amount {
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .card:hover .divider-line {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.6)
    );
    opacity: 1;
  }

  .card:hover .detail-item {
    color: rgba(255, 255, 255, 0.95);
  }

  .card:hover .detail-text {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .card:hover .tag,
  .card:hover .tag-more {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    .card {
      height: 340px; /* Fixed height for mobile */
      padding: 1.5em 1em;
      margin: 8px;
    }

    .card-title {
      font-size: 1.2em;
      height: 2.8em; /* Adjusted for mobile */
    }

    .price-amount {
      font-size: 1.1em;
    }
  }
`;

const SubserviceCard: React.FC<SubserviceCardProps> = ({
  subservice,
  index = 0,
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      viewport={{ once: true }}
    >
      <StyledWrapper>
        <Link href={`/services/subservice/${subservice.slug}`} className="card">
          {/* Title */}
          <h3 className="card-title">{subservice.name}</h3>

          {/* Price Section - Bigger and more visible */}
          <div className="price-section">
            <span className="price-amount">
              {formatPrice(subservice.price_start, subservice.priceType)}
            </span>
          </div>

          {/* Divider Line */}
          <div className="divider-line"></div>

          {/* Details Section */}
          <div className="details-section">
            {/* Other Service Details */}
            <div className="service-details">
              {/* Duration */}
              {subservice.estimatedDuration && (
                <div className="detail-item">
                  <Clock className="detail-icon" />
                  <span className="detail-text">
                    Durata: {formatDuration(subservice.estimatedDuration)}
                  </span>
                </div>
              )}

              {/* Rating */}
              {subservice.rating > 0 && (
                <div className="detail-item">
                  <Star className="detail-icon star-filled" />
                  <span className="detail-text">
                    {subservice.rating.toFixed(1)} ({subservice.reviews_count}{' '}
                    recensioni)
                  </span>
                </div>
              )}

              {/* Description */}
              {subservice.shortDescription && (
                <div className="detail-item">
                  <span
                    className="detail-text"
                    style={{
                      fontSize: '1em',
                      lineHeight: '1.4',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '500',
                    }}
                  >
                    {subservice.shortDescription}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tags - Always at bottom */}
          <div className="tags-container">
            {subservice.tags && subservice.tags.length > 0 ? (
              <>
                {subservice.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
                {subservice.tags.length > 2 && (
                  <span className="tag-more">
                    +{subservice.tags.length - 2}
                  </span>
                )}
              </>
            ) : (
              <span className="tag">Servizio legale</span>
            )}
          </div>

          <div className="go-corner">
            <div className="go-arrow">
              <ArrowRight />
            </div>
          </div>
        </Link>
      </StyledWrapper>
    </motion.div>
  );
};

export default SubserviceCard;
