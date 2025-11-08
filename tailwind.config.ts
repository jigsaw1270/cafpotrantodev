import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New elegant navy palette
        'navy-dark': '#142850',
        'navy-very-dark': '#2D4059',
        'navy-gradient-1': '#27496D',
        'navy-gradient-2': '#0C7B93',
        cyan: '#00A8CC',
        orange: '#F07B3F',
        yellow: '#FFD460',
        neon: '#B6F500',
        newblack: '#212121',
        newgrey: '#e6e6e6',

        // New color rework palette
        'new-navy': '#071739',
        'new-light-navy': '#4B6382',
        'new-dim-cyan': '#A4B5C4',
        'new-white': '#CDD5DB',
        'new-dark-beige': '#A68868',
        'new-beige': '#E3C39D',

        // Teal palette for gradients and accents
        'dark-teal': '#0F4C75',
        'light-teal': '#3282B8',

        // Semantic colors using the new palette
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
        'gradient-accent':
          'linear-gradient(135deg, var(--cyan), var(--navy-gradient-2))',
        'gradient-warning':
          'linear-gradient(135deg, var(--yellow), var(--orange))',
        'gradient-navy':
          'linear-gradient(135deg, var(--navy-dark), var(--navy-very-dark))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        elegant:
          '0 4px 6px -1px rgba(20, 40, 80, 0.1), 0 2px 4px -1px rgba(20, 40, 80, 0.06)',
        'elegant-lg':
          '0 10px 15px -3px rgba(20, 40, 80, 0.1), 0 4px 6px -2px rgba(20, 40, 80, 0.05)',
        'elegant-xl':
          '0 20px 25px -5px rgba(20, 40, 80, 0.1), 0 10px 10px -5px rgba(20, 40, 80, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      fontFamily: {
        roundex: ['var(--font-roundex)', 'sans-serif'],
        'pathway-extreme': ['var(--font-pathway-extreme)', 'sans-serif'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
