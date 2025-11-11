import Head from 'next/head';

export interface SEOProps {
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
}: SEOProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cafpatronatoaz.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="CafPatronatoAZ Legal Services" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cafpatronatoaz" />
      <meta name="twitter:creator" content="@cafpatronatoaz" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional meta tags */}
      <meta name="author" content="CafPatronatoAZ Legal Services" />
      <meta
        name="keywords"
        content="legal services, CAF services, Patronato, online procedures, work benefits, pensions, ISEE, NASpI, SPID"
      />
    </Head>
  );
}
