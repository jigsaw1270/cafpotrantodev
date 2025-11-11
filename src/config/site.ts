export const siteConfig = {
  name: 'CafPatronatoAZ Legal Services',
  description:
    'Professional legal services for businesses and citizens to manage online procedures. Expert assistance with CAF and Patronato services, work benefits, pensions, and administrative procedures.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpatronatoaz.com',
  ogImage: '/og-image.jpg',
  author: {
    name: 'CafPatronatoAZ Legal Services',
    twitter: '@cafpatronatoaz',
    github: 'https://github.com/cafpatronatoaz',
    linkedin: 'https://linkedin.com/company/cafpatronatoaz',
  },
  links: {
    twitter: 'https://twitter.com/cafpatronatoaz',
    github: 'https://github.com/cafpatronatoaz',
    linkedin: 'https://linkedin.com/company/cafpatronatoaz',
    email: 'info@cafpatronatoaz.com',
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
