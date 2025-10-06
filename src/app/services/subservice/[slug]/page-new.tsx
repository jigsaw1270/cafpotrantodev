import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import apiClient from '@/lib/api';
import SubservicePageClient from '@/components/pages/SubservicePageClient';
import { Subservice } from '@/lib/types';

export const revalidate = 300; // ISR: Revalidate every 5 minutes

interface SubservicePageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all subservices
export async function generateStaticParams() {
  try {
    // Get all categories first
    const categoriesResponse = await apiClient.getCategories({
      active: true,
      limit: 100,
    });

    if (!categoriesResponse.success || !categoriesResponse.data) {
      return [];
    }

    const slugs: string[] = [];

    // Get subservices for each category
    for (const category of categoriesResponse.data.categories) {
      try {
        const subservicesResponse = await apiClient.getSubservicesByCategory(
          category._id,
          {
            active: true,
            limit: 100,
          }
        );

        if (subservicesResponse.success && subservicesResponse.data) {
          const subserviceSlugs = subservicesResponse.data.subservices.map(
            (subservice: Subservice) => subservice.slug
          );
          slugs.push(...subserviceSlugs);
        }
      } catch (error) {
        console.error(
          `Error fetching subservices for category ${category._id}:`,
          error
        );
      }
    }

    return slugs.map(slug => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for subservices:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: SubservicePageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const subserviceResponse = await apiClient.getSubserviceBySlug(slug);

    if (!subserviceResponse.success || !subserviceResponse.data) {
      return {
        title: 'Servizio non trovato - CafPotranto',
        description: 'Il servizio richiesto non è stato trovato.',
      };
    }

    const subservice = subserviceResponse.data.subservice;

    return {
      title: `${subservice.name} - CafPotranto`,
      description: subservice.shortDescription || subservice.description,
      openGraph: {
        title: `${subservice.name} - CafPotranto`,
        description: subservice.shortDescription || subservice.description,
        type: 'website',
        url: `/services/subservice/${subservice.slug}`,
        images: subservice.image?.url ? [{ url: subservice.image.url }] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for subservice:', error);
    return {
      title: 'Servizio - CafPotranto',
      description: 'Servizi legali e assistenza CAF professionali.',
    };
  }
}

export default async function SubservicePage({ params }: SubservicePageProps) {
  const { slug } = params;

  try {
    // Fetch subservice data at build time / revalidation
    const subserviceResponse = await apiClient.getSubserviceBySlug(slug);

    if (!subserviceResponse.success || !subserviceResponse.data) {
      notFound();
    }

    const subservice = subserviceResponse.data.subservice;

    // Get the category details
    let category = null;
    if (subservice.categoryId) {
      try {
        const categoryResponse = await apiClient.getCategoryById(
          subservice.categoryId
        );
        if (categoryResponse.success && categoryResponse.data) {
          category = categoryResponse.data;
        }
      } catch (error) {
        console.error('Error fetching category for subservice:', error);
      }
    }

    return (
      <SubservicePageClient
        subservice={subservice}
        category={category}
        slug={slug}
      />
    );
  } catch (error) {
    console.error('Error fetching subservice data:', error);
    notFound();
  }
}
