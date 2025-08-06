import { NextSeo, type NextSeoProps } from 'next-seo';

export interface SEOProps extends NextSeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SEO({
  title,
  description,
  image = '/og-image.jpg',
  url,
  type = 'website',
  ...props
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpotranto.dev';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={fullUrl}
      openGraph={{
        type,
        title,
        description,
        url: fullUrl,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        siteName: 'CafPotranto Dev',
      }}
      twitter={{
        handle: '@cafpotranto',
        site: '@cafpotranto',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'author',
          content: 'CafPotranto Dev',
        },
        {
          name: 'keywords',
          content: 'web development, frontend, react, nextjs, typescript',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ]}
      {...props}
    />
  );
}
