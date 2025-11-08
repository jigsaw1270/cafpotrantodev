'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlossyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function GlossyButton({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: GlossyButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      className={`border-light-teal group relative overflow-hidden rounded-xl border bg-gradient-to-r from-teal-700/55 to-teal-800/55 px-8 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-60" />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-teal-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <span className="font-family-general-sans relative z-10">{children}</span>
    </motion.button>
  );
}
