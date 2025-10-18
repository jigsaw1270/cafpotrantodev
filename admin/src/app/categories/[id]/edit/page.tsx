'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import { Category, CategoryFormData } from '@/types';
import { toast } from 'react-toastify';

export default function EditCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const router = useRouter();
  const params = useParams();
  const categoryId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
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
        const categoryData = response.data.category;
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
      } else {
        toast.error('Category not found');
        router.push('/categories');
      }
    } catch (error) {
      console.error('Failed to fetch category:', error);
      toast.error('Failed to load category');
      router.push('/categories');
    } finally {
      setPageLoading(false);
    }
  }, [categoryId, reset, router]);

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, fetchCategory]);

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setRemoveExistingImage(false);
      };
      reader.readAsDataURL(file);
    } else if (!removeExistingImage && category?.image) {
      setPreviewImage(category.image.url);
    } else {
      setPreviewImage(null);
    }
  }, [watchedImage, category, removeExistingImage]);

  const handleRemoveImage = () => {
    setRemoveExistingImage(true);
    setPreviewImage(null);
    setValue('image', undefined);
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setLoading(true);

      const formData = {
        ...data,
        description: data.description?.trim() || undefined, // Send undefined if empty
        // Convert metadata to proper format
        metadata: {
          seoTitle: data.metadata?.seoTitle || '',
          seoDescription: data.metadata?.seoDescription || '',
          seoKeywords: data.metadata?.seoKeywords || [],
        },
      };

      const imageFile =
        data.image && data.image.length > 0 ? data.image[0] : undefined;

      const response = await apiClient.updateCategory(
        categoryId!,
        formData,
        imageFile
      );

      if (response.success) {
        toast.success('Category updated successfully');
        router.push('/categories');
      } else {
        toast.error(response.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to update category');
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

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Category Not Found
          </h2>
          <Link
            href="/categories"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Categories
          </Link>
        </div>
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
                Edit Category
              </h1>
              <p className="text-gray-600">
                Update &ldquo;{category.name}&rdquo; information
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
            {/* Basic Information */}
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
                        Description
                        <span className="text-sm font-normal text-gray-500">
                          {' '}
                          (optional, min 10 characters if provided)
                        </span>
                      </label>
                      <textarea
                        {...register('description', {
                          validate: value => {
                            if (!value || value.trim() === '') return true; // Allow empty
                            if (value.trim().length < 10)
                              return 'Description must be at least 10 characters when provided';
                            if (value.trim().length > 500)
                              return 'Description cannot exceed 500 characters';
                            return true;
                          },
                        })}
                        rows={4}
                        className="admin-textarea mt-1"
                        placeholder="Describe what services are included in this category (optional)..."
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
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <div className="mt-1">
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
                        <div className="relative">
                          <Image
                            className="h-20 w-20 rounded-lg object-cover"
                            src={previewImage}
                            alt="Preview"
                            width={80}
                            height={80}
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
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
                      {category.image && !removeExistingImage && (
                        <p className="mt-1 text-xs text-green-600">
                          Current: {category.image.originalName}
                        </p>
                      )}
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
                      <p className="mt-1 text-xs text-gray-500">
                        Leave empty to auto-generate from category name
                      </p>
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
                      <p className="mt-1 text-xs text-gray-500">
                        Leave empty to auto-generate from description
                      </p>
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
                    Updating...
                  </div>
                ) : (
                  'Update Category'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
