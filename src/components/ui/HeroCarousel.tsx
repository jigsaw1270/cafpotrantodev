'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Loader from '@/components/ui/loader';

// Import Swiper styles
import 'swiper/css';

interface HeroCarouselProps {
  children?: React.ReactNode;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Generate carousel images array
  const carouselImages = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    src: `/images/carousel/carousel${i + 1}.webp`,
    alt: `Carousel image ${i + 1}`,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="xs:pt-32 relative min-h-screen overflow-hidden bg-gradient-to-br from-[#00A8CC] to-[#142850] pt-28 md:h-[calc(100vh-4rem)] md:pt-24">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="xs:px-4 relative z-10 container mx-auto flex h-full items-center justify-center px-3 py-0 sm:px-8 md:py-0 lg:px-12">
          <Loader size="large" centered />
        </div>
      </section>
    );
  }

  return (
    <section className="xs:pt-32 relative min-h-screen overflow-hidden pt-28 md:h-[calc(100vh-4rem)] md:pt-24">
      {/* Swiper Carousel */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          grabCursor={false}
          allowTouchMove={false}
          simulateTouch={false}
          className="mySwiper hero-carousel-swiper"
          style={{ width: '100%', height: '100%' }}
        >
          {carouselImages.map(image => (
            <SwiperSlide key={image.id}>
              <div className="relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.id <= 3}
                  className="carousel-image object-cover object-center"
                  quality={90}
                  sizes="100vw"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Overlay */}
      <div
        className="xs:px-4 relative z-10 container mx-auto flex h-full items-center px-3 sm:px-6 lg:px-12"
        style={{ minHeight: '350px' }}
      >
        <div
          className="xs:max-w-sm mx-auto w-full max-w-xs text-center sm:max-w-4xl"
          style={{
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      </div>

      <style jsx global>{`
        /* Optimize font loading to prevent layout shift */
        @font-face {
          font-display: swap;
        }

        .mySwiper {
          width: 100%;
          height: 100%;
          --swiper-theme-color: #e3c39d;
          cursor: default;
          contain: layout style paint;
          will-change: transform;
        }

        .carousel-image {
          transform: scale(1);
          filter: none;
          contain: layout;
          content-visibility: auto;
        }

        .mySwiper .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          contain: layout style;
        }

        .mySwiper .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
        }

        /* Very small screens optimization (< 400px) */
        @media (max-width: 399px) {
          .mySwiper .swiper-slide {
            font-size: 14px;
          }

          .carousel-image {
            object-position: center center;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .mySwiper {
            --swiper-transition-duration: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
