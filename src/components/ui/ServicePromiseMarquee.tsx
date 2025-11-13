'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ServicePromiseMarquee = () => {
  const marqueeText =
    "Pratiche online senza pensieri! Ti contattiamo rapidamente e, se non inviamo la tua pratica entro 72 ore, rimborsiamo l'importo versato";
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      setMarqueeWidth(marqueeRef.current.scrollWidth);
    }
  }, []);

  return (
    <div className="from-light-teal/60 to-dark-teal/60 relative w-full overflow-hidden border-t-2 border-b-2 border-[#e3c39d]/70 bg-gradient-to-r shadow-lg backdrop-blur-md">
      {/* Glass effect layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent"></div>

      {/* Subtle noise texture for glass effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="relative flex h-8 items-center md:h-9 lg:h-10">
        <motion.div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -marqueeWidth || -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          style={{
            width: 'max-content',
          }}
        >
          {/* Repeat the text multiple times to ensure continuous scroll */}
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex items-center text-xs font-medium tracking-wide text-white md:text-sm lg:text-base"
              style={{ fontFamily: 'Pathway Extreme, sans-serif' }}
            >
              <motion.span
                className="mx-2 text-sm text-[#e3c39d] md:mx-3 md:text-base"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.5,
                }}
              >
                ⭐
              </motion.span>
              <span className="mx-3 text-shadow-lg md:mx-4 lg:mx-6">
                {marqueeText}
              </span>
              <motion.span
                className="mx-2 text-sm text-[#e3c39d] md:mx-3 md:text-base"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.5 + 1,
                }}
              >
                ⭐
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient fade edges with glass effect */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#00A8CC]/60 via-[#00A8CC]/30 to-transparent backdrop-blur-sm"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-[#142850]/60 via-[#142850]/30 to-transparent backdrop-blur-sm"></div>

      {/* Additional glass reflection effect */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-full w-1/2 skew-x-12 transform bg-gradient-to-b from-white/8 via-transparent to-transparent"></div>

      <style jsx>{`
        .text-shadow-lg {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.2),
            0 0 10px rgba(255, 255, 255, 0.1);
        }

        /* Glass morphism enhancement */
        @supports (backdrop-filter: blur(10px)) {
          .glass-effect {
            backdrop-filter: blur(10px) saturate(180%);
            -webkit-backdrop-filter: blur(10px) saturate(180%);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .motion-div {
            animation: none !important;
            transform: none !important;
          }
        }

        /* Enhanced mobile styles */
        @media (max-width: 640px) {
          .text-shadow-lg {
            font-size: 12px;
            text-shadow:
              0 1px 2px rgba(0, 0, 0, 0.3),
              0 0 8px rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicePromiseMarquee;
