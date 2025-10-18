'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import { Category, CategoryFormData } from '@/types';
import { toast } from 'react-toastify';

export default function CategoryFormPage() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== 'new';
  const categoryId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      description: '',
      displayOrder: 1,
      isActive: true,
      metadata: {
        seoTitle: '',
        seoDescription: '',
        seoKeywords: [],
      },
    },
  });

  const watchedImage = watch('image');

  const fetchCategory = useCallback(async () => {
    if (!categoryId) return;

    try {
      setPageLoading(true);
      const response = await apiClient.getCategory(categoryId);
      if (response.success && response.data) {
        const categoryData = response.data;
        setCategory(categoryData);

        // Populate form with existing data
        reset({
          name: categoryData.name,
          description: categoryData.description,
          displayOrder: categoryData.displayOrder,
          isActive: categoryData.isActive,
          metadata: {
            seoTitle: categoryData.metadata?.seoTitle || '',
            seoDescription: categoryData.metadata?.seoDescription || '',
            seoKeywords: categoryData.metadata?.seoKeywords || [],
          },
        });

        if (categoryData.image) {
          setPreviewImage(categoryData.image.url);
        }
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      toast.error('Failed to fetch category');
    } finally {
      setPageLoading(false);
    }
  }, [categoryId, reset]);

  useEffect(() => {
    if (isEdit && categoryId) {
      fetchCategory();
    }
  }, [isEdit, categoryId, fetchCategory]);

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [watchedImage]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setLoading(true);

      let response;
      const imageFile =
        data.image && data.image.length > 0 ? data.image[0] : undefined;

      if (isEdit) {
        response = await apiClient.updateCategory(categoryId!, data, imageFile);
      } else {
        response = await apiClient.createCategory(data, imageFile);
      }

      if (response.success) {
        toast.success(
          `Category ${isEdit ? 'updated' : 'created'} successfully`
        );
        router.push('/categories');
      } else {
        toast.error(
          response.message ||
            `Failed to ${isEdit ? 'update' : 'create'} category`
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} category`);
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
                {isEdit ? 'Edit Category' : 'Create Category'}
              </h1>
              <p className="text-gray-600">
                {isEdit
                  ? 'Update category information'
                  : 'Add a new service category'}
              </p>
            </div>
            <Link
              href="/categories"
              className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Back to Categories
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Basic Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Essential details about the category.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category Name *
                      </label>
                      <input
                        {...register('name', {
                          required: 'Category name is required',
                        })}
                        type="text"
                        className="admin-input mt-1"
                        placeholder="e.g., Family Law"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description *
                      </label>
                      <textarea
                        {...register('description', {
                          required: 'Description is required',
                        })}
                        rows={4}
                        className="admin-textarea mt-1"
                        placeholder="Describe what services are included in this category..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.description.message}
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
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <div className="mt-1">
                        <label className="inline-flex items-center">
                          <input
                            {...register('isActive')}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-900">
                            Active
                          </span>
                        </label>
                      </div>
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
                    Category Image
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload an image to represent this category.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      {previewImage ? (
                        <Image
                          className="h-16 w-16 rounded-lg object-cover"
                          src={previewImage}
                          alt="Preview"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
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
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    SEO Settings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Optimize this category for search engines.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
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
                href="/categories"
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
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </div>
                ) : isEdit ? (
                  'Update Category'
                ) : (
                  'Create Category'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
