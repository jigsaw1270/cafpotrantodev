'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import { Category } from '@/types';
import { toast } from 'react-toastify';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Admin panel should show ALL categories (both active and inactive)
      // Make two parallel requests to get both active and inactive categories
      const [activeResponse, inactiveResponse] = await Promise.all([
        apiClient.getCategories({ limit: 100, active: true }),
        apiClient.getCategories({ limit: 100, active: false }),
      ]);

      if (activeResponse.success && inactiveResponse.success) {
        // Combine both active and inactive categories
        const allCategories = [
          ...(activeResponse.data?.categories || []),
          ...(inactiveResponse.data?.categories || []),
        ];

        // Sort by displayOrder to maintain proper order
        allCategories.sort(
          (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
        );

        setCategories(allCategories);
      } else {
        // Fallback: if one request fails, try to get at least some data
        const successResponse = activeResponse.success
          ? activeResponse
          : inactiveResponse;
        if (successResponse.success && successResponse.data) {
          setCategories(successResponse.data.categories || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await apiClient.deleteCategory(id);
      if (response.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
      } else {
        toast.error(response.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete category');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      setStatusLoading(id);
      const response = await apiClient.updateCategory(id, {
        isActive: !isActive,
      });
      if (response.success) {
        toast.success(
          `Category ${!isActive ? 'activated' : 'deactivated'} successfully`
        );
        fetchCategories();
      } else {
        toast.error(response.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update category');
    } finally {
      setStatusLoading(null);
    }
  };

  if (loading) {
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
              <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
              <p className="text-gray-600">Manage your service categories</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/categories/new"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Category
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {categories.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-24 w-24 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No categories found
              </h3>
              <p className="mb-6 text-gray-500">
                Get started by creating your first category.
              </p>
              <Link
                href="/categories/new"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Category
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {categories.map(category => (
                  <li key={category._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {category.image && (
                          <Image
                            src={category.image.url}
                            alt={category.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {category.description}
                          </p>
                          <div className="mt-1 flex items-center space-x-4">
                            <span className="text-xs text-gray-500">
                              Order: {category.displayOrder}
                            </span>
                            <span className="text-xs text-gray-500">
                              Subservices: {category.subservicesCount || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            category.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>

                        <button
                          onClick={() =>
                            toggleStatus(category._id, category.isActive)
                          }
                          disabled={statusLoading === category._id}
                          className={`rounded px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50 ${
                            category.isActive
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {statusLoading === category._id ? (
                            <div className="flex items-center space-x-1">
                              <div className="h-3 w-3 animate-spin rounded-full border-b border-current"></div>
                              <span>
                                {category.isActive
                                  ? 'Deactivating...'
                                  : 'Activating...'}
                              </span>
                            </div>
                          ) : category.isActive ? (
                            'Deactivate'
                          ) : (
                            'Activate'
                          )}
                        </button>

                        <Link
                          href={`/categories/${category._id}/edit`}
                          className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(category._id)}
                          disabled={deleteLoading === category._id}
                          className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-800 hover:bg-red-200 disabled:opacity-50"
                        >
                          {deleteLoading === category._id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
