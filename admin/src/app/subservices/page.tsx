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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = useCallback(async () => {
    try {
      const response = await apiClient.getCategories({ limit: 100 });
      if (response.success && response.data) {
        setCategories(response.data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  const fetchSubservices = useCallback(async () => {
    try {
      const params: { limit: number; categoryId?: string; search?: string } = { limit: 50 };
      if (selectedCategory) params.categoryId = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      
      const response = await apiClient.getSubservices(params);
      if (response.success && response.data) {
        setSubservices(response.data.subservices || []);
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
      const response = await apiClient.updateSubservice(id, { isActive: !isActive });
      if (response.success) {
        toast.success(`Subservice ${!isActive ? 'activated' : 'deactivated'} successfully`);
        fetchSubservices();
      } else {
        toast.error(response.message || 'Failed to update subservice');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update subservice');
    }
  };

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      const response = await apiClient.updateSubservice(id, { isFeatured: !isFeatured });
      if (response.success) {
        toast.success(`Subservice ${!isFeatured ? 'featured' : 'unfeatured'} successfully`);
        fetchSubservices();
      } else {
        toast.error(response.message || 'Failed to update subservice');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update subservice');
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

  const getCategoryName = (subservice: { categoryId: string | { _id: string; name: string; slug?: string } }) => {
    // If categoryId is populated (object), use its name
    if (subservice.categoryId && typeof subservice.categoryId === 'object' && 'name' in subservice.categoryId) {
      return subservice.categoryId.name;
    }
    
    // If categoryId is just an ID string, find it in categories array
    if (typeof subservice.categoryId === 'string') {
      const category = categories.find(cat => cat._id === subservice.categoryId);
      return category ? category.name : 'Unknown Category';
    }
    
    return 'Unknown Category';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subservices</h1>
              <p className="text-gray-600">Manage your legal services</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/categories"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Manage Categories
              </Link>
              <Link
                href="/subservices/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Subservice
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Subservices
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {subservices.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subservices found</h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory || searchTerm 
                  ? "No subservices match your current filters." 
                  : "Get started by creating your first subservice."
                }
              </p>
              <Link
                href="/subservices/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Subservice
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {subservices.map((subservice) => (
                  <li key={subservice._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {subservice.image && (
                          <Image
                            src={subservice.image.url}
                            alt={subservice.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900">{subservice.name}</h3>
                            {subservice.isFeatured && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {subservice.shortDescription || subservice.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {getCategoryName(subservice)}
                            </span>
                            <span className="font-medium text-green-600">
                              {formatPrice(subservice)}
                            </span>
                            <span>Order: {subservice.displayOrder}</span>
                            <span>Rating: {subservice.rating}/5 ({subservice.reviews_count} reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subservice.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subservice.isActive ? 'Active' : 'Inactive'}
                        </span>
                        
                        <button
                          onClick={() => toggleFeatured(subservice._id, subservice.isFeatured)}
                          className={`px-3 py-1 text-xs font-medium rounded ${
                            subservice.isFeatured 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {subservice.isFeatured ? 'Unfeature' : 'Feature'}
                        </button>
                        
                        <button
                          onClick={() => toggleStatus(subservice._id, subservice.isActive)}
                          className={`px-3 py-1 text-xs font-medium rounded ${
                            subservice.isActive 
                              ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {subservice.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        
                        <Link
                          href={`/subservices/${subservice._id}/edit`}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 text-xs font-medium rounded"
                        >
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => handleDelete(subservice._id)}
                          disabled={deleteLoading === subservice._id}
                          className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 text-xs font-medium rounded disabled:opacity-50"
                        >
                          {deleteLoading === subservice._id ? 'Deleting...' : 'Delete'}
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
