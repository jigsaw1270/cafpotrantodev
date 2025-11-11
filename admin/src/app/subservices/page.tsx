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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center">
          <div
            className="admin-spinner mx-auto mb-4"
            style={{ width: '3rem', height: '3rem' }}
          ></div>
          <p className="text-navy-dark font-medium">Loading subservices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <header className="shadow-elegant border-b border-slate-200/60 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-gradient-primary text-3xl font-bold">
                Subservices
              </h1>
              <p className="text-navy-very-dark/70 font-medium">
                Manage your legal services
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="btn-admin-secondary hover-lift"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>
              <Link
                href="/categories"
                className="btn-admin-secondary hover-lift"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Categories
              </Link>
              <Link
                href="/subservices/new"
                className="btn-admin-primary hover-lift"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Subservice
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="shadow-elegant-lg mb-8 rounded-2xl border border-slate-200/50 bg-white/80 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center">
            <div className="gradient-primary mr-3 flex h-8 w-8 items-center justify-center rounded-lg">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                />
              </svg>
            </div>
            <h2 className="text-navy-dark text-xl font-bold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="category-filter"
                className="text-navy-dark mb-3 block text-sm font-semibold"
              >
                Filter by Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="admin-select"
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
                className="text-navy-dark mb-3 block text-sm font-semibold"
              >
                Search Subservices
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {subservices.length === 0 ? (
            <div className="shadow-elegant-lg rounded-2xl border border-slate-200/50 bg-white/80 py-16 text-center backdrop-blur-sm">
              <div className="text-navy-very-dark/40 mx-auto mb-6 h-24 w-24">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-navy-dark mb-3 text-xl font-bold">
                No subservices found
              </h3>
              <p className="text-navy-very-dark/60 mb-8 font-medium">
                {selectedCategory || searchTerm
                  ? 'No subservices match your current filters.'
                  : 'Get started by creating your first subservice.'}
              </p>
              <Link
                href="/subservices/new"
                className="btn-admin-primary hover-lift"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Subservice
              </Link>
            </div>
          ) : (
            <div className="shadow-elegant-lg overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <ul className="divide-y divide-slate-200/60">
                {subservices.map(subservice => (
                  <li
                    key={subservice._id}
                    className="px-8 py-6 transition-colors duration-200 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center space-x-6">
                        {subservice.image && (
                          <Image
                            src={subservice.image.url}
                            alt={subservice.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-xl border-2 border-white/80 object-cover shadow-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="mb-2 flex items-center space-x-3">
                            <h3 className="text-navy-dark text-lg font-bold">
                              {subservice.name}
                            </h3>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                subservice.isActive
                                  ? 'status-active'
                                  : 'status-inactive'
                              }`}
                            >
                              {subservice.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-navy-very-dark/70 mb-3 line-clamp-2 text-sm font-medium">
                            {subservice.shortDescription ||
                              subservice.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            <span className="from-navy-gradient-1/10 to-cyan/10 text-navy-dark border-navy-gradient-1/20 rounded-full border bg-gradient-to-r px-3 py-1 font-semibold">
                              {getCategoryName(subservice)}
                            </span>
                            <span className="text-gradient-primary font-bold">
                              {formatPrice(subservice)}
                            </span>
                            <span className="text-navy-very-dark/60 font-medium">
                              Order: {subservice.displayOrder}
                            </span>
                            <span className="text-navy-very-dark/60 font-medium">
                              ⭐ {subservice.rating}/5 (
                              {subservice.reviews_count} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex items-center space-x-3">
                        <button
                          onClick={() =>
                            toggleStatus(subservice._id, subservice.isActive)
                          }
                          disabled={statusLoading === subservice._id}
                          className={`hover-lift rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 ${
                            subservice.isActive
                              ? 'from-orange to-yellow text-navy-dark bg-gradient-to-r'
                              : 'btn-admin-success'
                          }`}
                        >
                          {statusLoading === subservice._id ? (
                            <div className="flex items-center space-x-2">
                              <div className="admin-spinner"></div>
                              <span>
                                {subservice.isActive
                                  ? 'Deactivating...'
                                  : 'Activating...'}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              {subservice.isActive ? (
                                <>
                                  <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                    />
                                  </svg>
                                  <span>Deactivate</span>
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span>Activate</span>
                                </>
                              )}
                            </div>
                          )}
                        </button>

                        <Link
                          href={`/subservices/${subservice._id}/edit`}
                          className="btn-admin-primary hover-lift inline-flex items-center space-x-1 px-4 py-2 text-xs"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(subservice._id)}
                          disabled={deleteLoading === subservice._id}
                          className="btn-admin-danger hover-lift inline-flex items-center space-x-1 px-4 py-2 text-xs disabled:transform-none disabled:opacity-50"
                        >
                          {deleteLoading === subservice._id ? (
                            <>
                              <div className="admin-spinner"></div>
                              <span>Deleting...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span>Delete</span>
                            </>
                          )}
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
