'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import { toast } from 'react-toastify';

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    displayOrder: 1,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    // Validate description if provided
    if (
      formData.description.trim() &&
      formData.description.trim().length < 10
    ) {
      toast.error('Description must be at least 10 characters when provided');
      return;
    }

    if (
      formData.description.trim() &&
      formData.description.trim().length > 500
    ) {
      toast.error('Description cannot exceed 500 characters');
      return;
    }

    setLoading(true);

    try {
      // Prepare category data
      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined, // Send undefined if empty
        displayOrder: Number(formData.displayOrder),
        isActive: formData.isActive,
      };

      // Debug logging
      console.log('=== CATEGORY CREATION DEBUG ===');
      console.log(
        'Category data being sent:',
        JSON.stringify(categoryData, null, 2)
      );
      console.log('Image file:', imageFile);
      console.log('===============================');

      // Create the category with image if provided
      const categoryResponse = await apiClient.createCategory(
        categoryData,
        imageFile || undefined
      );

      console.log('=== CATEGORY RESPONSE DEBUG ===');
      console.log('Response:', categoryResponse);
      console.log('===============================');

      if (!categoryResponse.success) {
        throw new Error(
          categoryResponse.message || 'Failed to create category'
        );
      }

      toast.success('Category created successfully!');
      router.push('/categories');
    } catch (error: unknown) {
      console.error('Create category error:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create category';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Category
              </h1>
              <p className="text-gray-600">Create a new service category</p>
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
      <main className="mx-auto max-w-3xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white shadow">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Category Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="admin-input"
                  placeholder="Enter category name"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                  <span className="text-sm font-normal text-gray-500">
                    {' '}
                    (optional, min 10 characters if provided)
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="admin-textarea"
                  placeholder="Enter category description (optional)"
                />
                <div className="mt-1 text-sm text-gray-500">
                  {formData.description.length > 0 && (
                    <span
                      className={
                        formData.description.length < 10
                          ? 'text-orange-600'
                          : formData.description.length > 500
                            ? 'text-red-600'
                            : 'text-green-600'
                      }
                    >
                      {formData.description.length}/500 characters
                      {formData.description.length > 0 &&
                        formData.description.length < 10 &&
                        ' (minimum 10 required)'}
                      {formData.description.length > 500 &&
                        ' (exceeds maximum)'}
                    </span>
                  )}
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label
                  htmlFor="displayOrder"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Display Order
                </label>
                <input
                  type="number"
                  id="displayOrder"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                  min="1"
                  className="admin-input"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="admin-file-input"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="h-32 w-32 rounded-lg border border-gray-300 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="admin-checkbox"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Active (visible to users)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6">
                <Link
                  href="/categories"
                  className="rounded-md bg-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
