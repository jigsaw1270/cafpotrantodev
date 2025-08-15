export const siteConfig = {
  name: 'CafPotranto Legal Services',
  description: 'Professional legal services for businesses and citizens to manage online procedures. Expert assistance with CAF and Patronato services, work benefits, pensions, and administrative procedures.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.it',
  ogImage: '/og-image.jpg',
  author: {
    name: 'CafPotranto Legal Services',
    twitter: '@cafpotranto',
    github: 'https://github.com/cafpotranto',
    linkedin: 'https://linkedin.com/company/cafpotranto',
  },
  links: {
    twitter: 'https://twitter.com/cafpotranto',
    github: 'https://github.com/cafpotranto',
    linkedin: 'https://linkedin.com/company/cafpotranto',
    email: 'info@cafpotranto.it',
  },
  keywords: [
    'legal services',
    'CAF services',
    'Patronato',
    'online procedures',
    'work benefits',
    'pensions',
    'ISEE',
    'NASpI',
    'SPID',
    'administrative assistance',
    'Italian bureaucracy',
  ],
} as const;

export type SiteConfig = typeof siteConfig;
