'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import apiClient from '@/lib/api';
import { Category, SubserviceFormData } from '@/types';
import { toast } from 'react-toastify';

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);

export default function NewSubservicePage() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<SubserviceFormData>({
    defaultValues: {
      categoryId: '',
      name: '',
      description: '',
      shortDescription: '',
      price_start: 0,
      priceType: 'starting_from',
      rating: 0,
      reviews_count: 0,
      notes: '',
      isActive: true,
      isFeatured: false,
      displayOrder: 1,
      tags: [],
      features: [],
      requirements: [],
      secretarialFees: 6,
      vatPercentage: 6,
      metadata: {
        seoTitle: '',
        seoDescription: '',
        seoKeywords: [],
      },
    },
  });

  const watchedImage = watch('image');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      watchedImage &&
      watchedImage instanceof FileList &&
      watchedImage.length > 0
    ) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setPreviewImage(null);
      };
      reader.readAsDataURL(file);
    } else if (watchedImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setPreviewImage(null);
      };
      reader.readAsDataURL(watchedImage);
    } else {
      setPreviewImage(null);
    }
  }, [watchedImage]);

  const fetchCategories = async () => {
    try {
      setPageLoading(true);
      const response = await apiClient.getCategories({ limit: 100 });
      if (response.success && response.data) {
        setCategories(response.data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setPageLoading(false);
    }
  };

  const onSubmit = async (data: SubserviceFormData) => {
    try {
      setLoading(true);

      // Prepare form data with proper array handling
      const formData = {
        ...data,
        price_start: parseFloat(data.price_start.toString()),
        secretarialFees: data.secretarialFees
          ? parseFloat(data.secretarialFees.toString())
          : 6,
        vatPercentage: data.vatPercentage
          ? parseFloat(data.vatPercentage.toString())
          : 6,
        rating: parseFloat(data.rating.toString()),
        reviews_count: parseInt(data.reviews_count.toString()),
        displayOrder: parseInt(data.displayOrder.toString()),
        tags: data.tags || [],
        features: data.features || [],
        requirements: data.requirements || [],
        metadata: {
          seoTitle: data.metadata?.seoTitle || '',
          seoDescription: data.metadata?.seoDescription || '',
          seoKeywords: data.metadata?.seoKeywords || [],
        },
      };

      // Debug logging
      console.log('=== FRONTEND DEBUG ===');
      console.log('Form data being sent:', JSON.stringify(formData, null, 2));
      console.log('File:', data.image);
      console.log('======================');

      const response = await apiClient.createSubservice(formData, data.image);

      if (response.success) {
        toast.success('Subservice created successfully');
        router.push('/subservices');
      } else {
        toast.error(response.message || 'Failed to create subservice');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to create subservice');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Subservice
              </h1>
              <p className="text-gray-600">Add a new legal service</p>
            </div>
            <Link
              href="/subservices"
              className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Back to Subservices
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Basic Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Essential details about the subservice.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="categoryId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category *
                      </label>
                      <select
                        {...register('categoryId', {
                          required: 'Category is required',
                        })}
                        className="admin-select mt-1"
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.categoryId.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Service Name *
                      </label>
                      <input
                        {...register('name', {
                          required: 'Service name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                          },
                          maxLength: {
                            value: 100,
                            message: 'Name cannot exceed 100 characters',
                          },
                        })}
                        type="text"
                        className="admin-input mt-1"
                        placeholder="e.g., Divorce Consultation"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="shortDescription"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Short Description
                      </label>
                      <input
                        {...register('shortDescription', {
                          maxLength: {
                            value: 200,
                            message:
                              'Short description cannot exceed 200 characters',
                          },
                        })}
                        type="text"
                        className="admin-input mt-1"
                        placeholder="Brief one-line description"
                      />
                      {errors.shortDescription && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.shortDescription.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="displayOrder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Display Order
                      </label>
                      <input
                        {...register('displayOrder', {
                          required: 'Display order is required',
                          min: {
                            value: 1,
                            message: 'Order must be at least 1',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        min="1"
                        className="admin-input mt-1"
                      />
                      {errors.displayOrder && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.displayOrder.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <div className="space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            {...register('isActive')}
                            type="checkbox"
                            className="admin-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-900">
                            Active
                          </span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            {...register('isFeatured')}
                            type="checkbox"
                            className="admin-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-900">
                            Featured
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rich Text Description */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Detailed Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comprehensive description with rich text formatting.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Description *
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: 'Description is required',
                      minLength: {
                        value: 10,
                        message: 'Description must be at least 10 characters',
                      },
                    }}
                    render={({ field }) => (
                      <MDEditor
                        value={field.value}
                        onChange={value => field.onChange(value || '')}
                        preview="edit"
                        hideToolbar={false}
                        data-color-mode="light"
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Pricing Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Set pricing details for this service.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="price_start"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price (EUR) *
                      </label>
                      <input
                        {...register('price_start', {
                          required: 'Price is required',
                          min: {
                            value: 0,
                            message: 'Price cannot be negative',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        step="0.01"
                        min="0"
                        className="admin-input mt-1"
                        placeholder="0.00"
                      />
                      {errors.price_start && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.price_start.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="priceType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price Type
                      </label>
                      <select
                        {...register('priceType')}
                        className="admin-select mt-1"
                      >
                        <option value="starting_from">Starting from</option>
                        <option value="fixed">Fixed price</option>
                        <option value="hourly">Per hour</option>
                        <option value="consultation">
                          Consultation required
                        </option>
                      </select>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Initial Rating (0-5)
                      </label>
                      <input
                        {...register('rating', {
                          min: {
                            value: 0,
                            message: 'Rating cannot be less than 0',
                          },
                          max: {
                            value: 5,
                            message: 'Rating cannot be more than 5',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        className="admin-input mt-1"
                        placeholder="0.0"
                      />
                      {errors.rating && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.rating.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="reviews_count"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of Reviews
                      </label>
                      <input
                        {...register('reviews_count', {
                          min: {
                            value: 0,
                            message: 'Review count cannot be negative',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        min="0"
                        className="admin-input mt-1"
                        placeholder="0"
                      />
                      {errors.reviews_count && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.reviews_count.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="secretarialFees"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Secretarial Fees (EUR)
                      </label>
                      <input
                        {...register('secretarialFees', {
                          min: {
                            value: 0,
                            message: 'Secretarial fees cannot be negative',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        step="0.01"
                        min="0"
                        className="admin-input mt-1"
                        placeholder="6.00"
                      />
                      {errors.secretarialFees && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.secretarialFees.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="vatPercentage"
                        className="block text-sm font-medium text-gray-700"
                      >
                        VAT Percentage (%)
                      </label>
                      <input
                        {...register('vatPercentage', {
                          min: {
                            value: 0,
                            message: 'VAT percentage cannot be negative',
                          },
                          max: {
                            value: 100,
                            message: 'VAT percentage cannot exceed 100%',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        className="admin-input mt-1"
                        placeholder="6.00"
                      />
                      {errors.vatPercentage && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.vatPercentage.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Service Image
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload an image to represent this service.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      {previewImage ? (
                        <Image
                          className="h-20 w-20 rounded-lg object-cover"
                          src={previewImage}
                          alt="Preview"
                          width={80}
                          height={80}
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-200">
                          <svg
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        {...register('image')}
                        type="file"
                        accept="image/*"
                        className="admin-file-input"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Additional Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Extra notes and SEO settings.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Internal Notes
                      </label>
                      <textarea
                        {...register('notes', {
                          maxLength: {
                            value: 500,
                            message: 'Notes cannot exceed 500 characters',
                          },
                        })}
                        rows={3}
                        className="admin-textarea mt-1"
                        placeholder="Internal notes for admin use"
                      />
                      {errors.notes && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.notes.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="seoTitle"
                        className="block text-sm font-medium text-gray-700"
                      >
                        SEO Title
                      </label>
                      <input
                        {...register('metadata.seoTitle')}
                        type="text"
                        className="admin-input mt-1"
                        placeholder="Optimized title for search engines"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="seoDescription"
                        className="block text-sm font-medium text-gray-700"
                      >
                        SEO Description
                      </label>
                      <textarea
                        {...register('metadata.seoDescription')}
                        rows={3}
                        className="admin-textarea mt-1"
                        placeholder="Brief description for search results"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/subservices"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Creating...
                  </div>
                ) : (
                  'Create Subservice'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
