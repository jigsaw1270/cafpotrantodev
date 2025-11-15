'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

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
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#00A8CC] to-[#142850] pt-32 md:h-[calc(100vh-4rem)] md:pt-24">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto flex h-full items-center px-8 py-0 md:py-0 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-pulse">
              <div className="mb-4 h-12 rounded bg-white/20"></div>
              <div className="mb-8 h-8 rounded bg-white/20"></div>
              <div className="flex justify-center gap-4">
                <div className="h-10 w-32 rounded bg-white/20"></div>
                <div className="h-10 w-32 rounded bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 md:h-[calc(100vh-4rem)] md:pt-24">
      {/* Swiper Carousel */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, Scrollbar]}
          scrollbar={{
            hide: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={1000}
          grabCursor={true}
          allowTouchMove={true}
          touchRatio={1}
          touchAngle={45}
          simulateTouch={true}
          className="mySwiper hero-carousel-swiper"
          style={{ width: '100%', height: '100%' }}
        >
          {carouselImages.map(image => (
            <SwiperSlide key={image.id}>
              <div className="group relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.id <= 3}
                  className="object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale"
                  quality={90}
                  sizes="100vw"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

                {/* Additional overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto flex h-full items-center px-8 py-4 md:py-0 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">{children}</div>
      </div>

      <style jsx global>{`
        .mySwiper {
          width: 100%;
          height: 100%;
          --swiper-theme-color: #e3c39d;
          cursor: grab;
        }

        .mySwiper:active {
          cursor: grabbing;
        }

        .mySwiper .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .mySwiper .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
        }

        /* Scrollbar styling */
        .mySwiper .swiper-scrollbar {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .mySwiper .swiper-scrollbar-drag {
          background: #e3c39d;
          border-radius: 10px;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .mySwiper .swiper-slide img {
            transition: none !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .mySwiper .swiper-scrollbar {
            background: rgba(255, 255, 255, 0.3);
          }

          .mySwiper .swiper-scrollbar-drag {
            background: #ffffff;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
