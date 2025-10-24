'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OfficeCarouselProps {
  images: string[];
  officeName: string;
}

const OfficeCarousel: React.FC<OfficeCarouselProps> = ({
  images,
  officeName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg">
      {/* Main Image */}
      <div className="relative h-full w-full">
        <Image
          src={images[currentIndex]}
          alt={`${officeName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentIndex === 0}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-cyan w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OfficeCarousel;
