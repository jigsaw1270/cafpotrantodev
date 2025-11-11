import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import apiClient from '@/lib/api';
import CategoryPageClient from '@/components/pages/CategoryPageClient';
import { Category } from '@/lib/types';

export const revalidate = 300; // ISR: Revalidate every 5 minutes

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all categories
export async function generateStaticParams() {
  try {
    const response = await apiClient.getCategories({
      active: true,
      limit: 100,
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.categories.map((category: Category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const categoriesResponse = await apiClient.getCategories({
      active: true,
      limit: 100,
    });

    if (!categoriesResponse.success || !categoriesResponse.data) {
      return {
        title: 'Categoria non trovata - CafPatronatoAZ',
        description: 'La categoria richiesta non è stata trovata.',
      };
    }

    const category = categoriesResponse.data.categories.find(
      (cat: Category) => cat.slug === slug
    );

    if (!category) {
      return {
        title: 'Categoria non trovata - CafPatronatoAZ',
        description: 'La categoria richiesta non è stata trovata.',
      };
    }

    return {
      title: `${category.name} - CafPatronatoAZ`,
      description: category.description,
      openGraph: {
        title: `${category.name} - CafPatronatoAZ`,
        description: category.description,
        type: 'website',
        url: `/services/${category.slug}`,
        images: category.image?.url ? [{ url: category.image.url }] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for category:', error);
    return {
      title: 'Categoria - CafPatronatoAZ',
      description: 'Servizi legali e assistenza CAF professionali.',
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  try {
    // Fetch category data at build time / revalidation
    const categoriesResponse = await apiClient.getCategories({
      active: true,
      limit: 100,
    });

    if (!categoriesResponse.success || !categoriesResponse.data) {
      notFound();
    }

    const category = categoriesResponse.data.categories.find(
      (cat: Category) => cat.slug === slug
    );

    if (!category) {
      notFound();
    }

    // Fetch subservices for this category
    const subservicesResponse = await apiClient.getSubservicesByCategory(
      category._id,
      {
        active: true,
        limit: 100,
        sortBy: 'displayOrder',
        sortOrder: 'asc',
      }
    );

    const subservices =
      subservicesResponse.success && subservicesResponse.data
        ? subservicesResponse.data.subservices || []
        : [];

    return (
      <CategoryPageClient
        category={category}
        subservices={subservices}
        slug={slug}
      />
    );
  } catch (error) {
    console.error('Error fetching category data:', error);
    notFound();
  }
}
