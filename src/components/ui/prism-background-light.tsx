'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PrismBackgroundLightProps {
  className?: string;
}

export const PrismBackgroundLight: React.FC<PrismBackgroundLightProps> = ({
  className = '',
}) => {
  // Generate fewer prisms for performance
  const prisms = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: 150 + Math.random() * 100,
    startX: 30 + Math.random() * 40, // 30-70%
    startY: 30 + Math.random() * 40, // 30-70%
    duration: 20 + Math.random() * 15, // 20-35s
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  }));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="prism-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a8cc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0c7b93" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="prism-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d0bee2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b7ba8" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="prism-orange" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f07b3f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffd460" stopOpacity="0.3" />
          </linearGradient>

          {/* Blur filter */}
          <filter id="prism-blur-light">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>
        </defs>

        {prisms.map((prism, index) => {
          // Create hexagon points
          const points = Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 3) * i;
            const x = Math.cos(angle) * prism.size;
            const y = Math.sin(angle) * prism.size;
            return `${x},${y}`;
          }).join(' ');

          const gradients = ['prism-cyan', 'prism-purple', 'prism-orange'];
          const gradient = gradients[index % gradients.length];

          return (
            <motion.g
              key={prism.id}
              initial={{
                x: `${prism.startX}%`,
                y: `${prism.startY}%`,
              }}
              animate={{
                x: [
                  `${prism.startX}%`,
                  `${prism.startX + 8}%`,
                  `${prism.startX - 8}%`,
                  `${prism.startX}%`,
                ],
                y: [
                  `${prism.startY}%`,
                  `${prism.startY - 8}%`,
                  `${prism.startY + 8}%`,
                  `${prism.startY}%`,
                ],
              }}
              transition={{
                duration: prism.duration,
                delay: prism.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.polygon
                points={points}
                fill={`url(#${gradient})`}
                filter="url(#prism-blur-light)"
                opacity="0.8"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: prism.duration * 0.8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
