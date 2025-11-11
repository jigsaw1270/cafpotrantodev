'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import { Subservice, Category } from '@/types';
import { toast } from 'react-toastify';

export default function SubservicesPage() {
  const [subservices, setSubservices] = useState<Subservice[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = useCallback(async () => {
    try {
      // Admin panel should show ALL categories (both active and inactive)
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
    }
  }, []);

  const fetchSubservices = useCallback(async () => {
    try {
      // Admin panel should show ALL subservices (both active and inactive)
      const baseParams: {
        limit: number;
        categoryId?: string;
        search?: string;
      } = { limit: 50 };
      if (selectedCategory) baseParams.categoryId = selectedCategory;
      if (searchTerm) baseParams.search = searchTerm;

      // Make parallel requests to get both active and inactive subservices
      const [activeResponse, inactiveResponse] = await Promise.all([
        apiClient.getSubservices({ ...baseParams, active: true }),
        apiClient.getSubservices({ ...baseParams, active: false }),
      ]);

      if (activeResponse.success && inactiveResponse.success) {
        // Combine both active and inactive subservices
        const allSubservices = [
          ...(activeResponse.data?.subservices || []),
          ...(inactiveResponse.data?.subservices || []),
        ];

        // Sort by displayOrder to maintain proper order
        allSubservices.sort(
          (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
        );

        setSubservices(allSubservices);
      } else {
        // Fallback: if one request fails, try to get at least some data
        const successResponse = activeResponse.success
          ? activeResponse
          : inactiveResponse;
        if (successResponse.success && successResponse.data) {
          setSubservices(successResponse.data.subservices || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch subservices:', error);
    }
  }, [selectedCategory, searchTerm]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchSubservices()]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [fetchCategories, fetchSubservices]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchSubservices();
  }, [fetchSubservices]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subservice?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await apiClient.deleteSubservice(id);
      if (response.success) {
        toast.success('Subservice deleted successfully');
        fetchSubservices();
      } else {
        toast.error(response.message || 'Failed to delete subservice');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete subservice');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      setStatusLoading(id);
      const response = await apiClient.updateSubservice(id, {
        isActive: !isActive,
      });
      if (response.success) {
        toast.success(
          `Subservice ${!isActive ? 'activated' : 'deactivated'} successfully`
        );
        fetchSubservices();
      } else {
        toast.error(response.message || 'Failed to update subservice');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update subservice');
    } finally {
      setStatusLoading(null);
    }
  };

  const formatPrice = (subservice: Subservice) => {
    const price = subservice.price_start;
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    });

    switch (subservice.priceType) {
      case 'fixed':
        return formatter.format(price);
      case 'starting_from':
        return `From ${formatter.format(price)}`;
      case 'hourly':
        return `${formatter.format(price)}/hour`;
      case 'consultation':
        return 'Consultation required';
      default:
        return formatter.format(price);
    }
  };

  const getCategoryName = (subservice: {
    categoryId: string | { _id: string; name: string; slug?: string };
  }) => {
    // If categoryId is populated (object), use its name
    if (
      subservice.categoryId &&
      typeof subservice.categoryId === 'object' &&
      'name' in subservice.categoryId
    ) {
      return subservice.categoryId.name;
    }

    // If categoryId is just an ID string, find it in categories array
    if (typeof subservice.categoryId === 'string') {
      const category = categories.find(
        cat => cat._id === subservice.categoryId
      );
      return category ? category.name : 'Unknown Category';
    }

    return 'Unknown Category';
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
              <h1 className="text-3xl font-bold text-gray-900">Subservices</h1>
              <p className="text-gray-600">Manage your legal services</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/categories"
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                Manage Categories
              </Link>
              <Link
                href="/subservices/new"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Subservice
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="category-filter"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Filter by Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search Subservices
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {subservices.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-24 w-24 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No subservices found
              </h3>
              <p className="mb-6 text-gray-500">
                {selectedCategory || searchTerm
                  ? 'No subservices match your current filters.'
                  : 'Get started by creating your first subservice.'}
              </p>
              <Link
                href="/subservices/new"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Subservice
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {subservices.map(subservice => (
                  <li key={subservice._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center space-x-4">
                        {subservice.image && (
                          <Image
                            src={subservice.image.url}
                            alt={subservice.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="mb-1 flex items-center space-x-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {subservice.name}
                            </h3>
                          </div>
                          <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                            {subservice.shortDescription ||
                              subservice.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                              {getCategoryName(subservice)}
                            </span>
                            <span className="font-medium text-green-600">
                              {formatPrice(subservice)}
                            </span>
                            <span>Order: {subservice.displayOrder}</span>
                            <span>
                              Rating: {subservice.rating}/5 (
                              {subservice.reviews_count} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 flex items-center space-x-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            subservice.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {subservice.isActive ? 'Active' : 'Inactive'}
                        </span>

                        <button
                          onClick={() =>
                            toggleStatus(subservice._id, subservice.isActive)
                          }
                          disabled={statusLoading === subservice._id}
                          className={`rounded px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50 ${
                            subservice.isActive
                              ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {statusLoading === subservice._id ? (
                            <div className="flex items-center space-x-1">
                              <div className="h-3 w-3 animate-spin rounded-full border-b border-current"></div>
                              <span>
                                {subservice.isActive
                                  ? 'Deactivating...'
                                  : 'Activating...'}
                              </span>
                            </div>
                          ) : subservice.isActive ? (
                            'Deactivate'
                          ) : (
                            'Activate'
                          )}
                        </button>

                        <Link
                          href={`/subservices/${subservice._id}/edit`}
                          className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(subservice._id)}
                          disabled={deleteLoading === subservice._id}
                          className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-800 hover:bg-red-200 disabled:opacity-50"
                        >
                          {deleteLoading === subservice._id
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
