export const siteConfig = {
  name: 'CafPotranto Dev',
  description: 'Professional web development services with modern technologies. Specializing in React, Next.js, and TypeScript applications.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.dev',
  ogImage: '/og-image.jpg',
  author: {
    name: 'CafPotranto Dev',
    twitter: '@cafpotranto',
    github: 'https://github.com/cafpotranto',
    linkedin: 'https://linkedin.com/company/cafpotranto',
  },
  links: {
    twitter: 'https://twitter.com/cafpotranto',
    github: 'https://github.com/cafpotranto',
    linkedin: 'https://linkedin.com/company/cafpotranto',
    email: 'hello@cafpotranto.dev',
  },
  keywords: [
    'web development',
    'react',
    'nextjs',
    'typescript',
    'frontend',
    'fullstack',
    'tailwind css',
    'modern web',
  ],
} as const;

export type SiteConfig = typeof siteConfig;
