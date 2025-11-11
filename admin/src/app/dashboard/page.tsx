'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import apiClient from '@/lib/api';
import { Category, Subservice, PaginatedResponse } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { admin, logout } = useAuth();
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalSubservices: 0,
    recentCategories: [] as Category[],
    recentSubservices: [] as Subservice[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch categories and subservices
      const [categoriesResponse, subservicesResponse] = await Promise.all([
        apiClient.getCategories({ page: 1, limit: 5 }),
        apiClient.getSubservices({ page: 1, limit: 5 }),
      ]);

      setStats({
        totalCategories: categoriesResponse.data?.pagination?.total || 0,
        totalSubservices: subservicesResponse.data?.pagination?.total || 0,
        recentCategories: categoriesResponse.data?.categories || [],
        recentSubservices: subservicesResponse.data?.subservices || [],
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
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
                Dashboard
              </h1>
              <p className="text-navy-very-dark/70 font-medium">
                Welcome back, {admin?.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-admin-danger hover-lift"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Grid */}
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="shadow-elegant-lg hover-lift overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="gradient-primary flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
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
                    </div>
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-navy-very-dark/60 truncate text-sm font-semibold tracking-wide uppercase">
                        Total Categories
                      </dt>
                      <dd className="text-navy-dark text-2xl font-bold">
                        {stats.totalCategories}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="from-navy-gradient-1/5 to-cyan/5 bg-gradient-to-r px-6 py-4">
                <div className="text-sm">
                  <Link
                    href="/categories"
                    className="text-gradient-primary hover:text-cyan font-semibold transition-colors duration-200"
                  >
                    Manage categories →
                  </Link>
                </div>
              </div>
            </div>

            <div className="shadow-elegant-lg hover-lift overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="gradient-accent flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-navy-very-dark/60 truncate text-sm font-semibold tracking-wide uppercase">
                        Total Subservices
                      </dt>
                      <dd className="text-navy-dark text-2xl font-bold">
                        {stats.totalSubservices}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="from-cyan/5 to-navy-gradient-2/5 bg-gradient-to-r px-6 py-4">
                <div className="text-sm">
                  <Link
                    href="/subservices"
                    className="text-gradient-accent hover:text-cyan font-semibold transition-colors duration-200"
                  >
                    Manage subservices →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Items */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Recent Categories */}
            <div className="shadow-elegant-lg rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <div className="px-6 py-6 sm:p-8">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-navy-dark text-xl leading-6 font-bold">
                    Recent Categories
                  </h3>
                </div>
                {stats.recentCategories.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentCategories.map(category => (
                      <div
                        key={category._id}
                        className="flex items-center justify-between rounded-xl border border-slate-200/40 bg-gradient-to-r from-slate-50 to-blue-50/30 p-4"
                      >
                        <div className="flex-1">
                          <p className="text-navy-dark text-sm font-semibold">
                            {category.name}
                          </p>
                          <p className="text-navy-very-dark/60 mt-1 text-sm">
                            {category.description}
                          </p>
                        </div>
                        <span
                          className={`ml-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            category.isActive
                              ? 'status-active'
                              : 'status-inactive'
                          }`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <svg
                      className="text-navy-very-dark/40 mx-auto h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <p className="text-navy-very-dark/60 mt-2 text-sm font-medium">
                      No categories created yet.
                    </p>
                  </div>
                )}
                <div className="mt-6 border-t border-slate-200/60 pt-4">
                  <Link
                    href="/categories"
                    className="text-gradient-primary hover:text-cyan text-sm font-semibold transition-colors duration-200"
                  >
                    View all categories →
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Subservices */}
            <div className="shadow-elegant-lg rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <div className="px-6 py-6 sm:p-8">
                <div className="mb-6 flex items-center">
                  <div className="gradient-accent mr-3 flex h-8 w-8 items-center justify-center rounded-lg">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-navy-dark text-xl leading-6 font-bold">
                    Recent Subservices
                  </h3>
                </div>
                {stats.recentSubservices.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentSubservices.map(subservice => (
                      <div
                        key={subservice._id}
                        className="flex items-center justify-between rounded-xl border border-slate-200/40 bg-gradient-to-r from-slate-50 to-cyan-50/30 p-4"
                      >
                        <div className="flex-1">
                          <p className="text-navy-dark text-sm font-semibold">
                            {subservice.name}
                          </p>
                          <p className="text-navy-very-dark/60 mt-1 text-sm">
                            {subservice.category?.name || 'Unknown Category'}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-cyan mb-1 text-sm font-bold">
                            €{subservice.price_start || 0}
                          </p>
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <svg
                      className="text-navy-very-dark/40 mx-auto h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-navy-very-dark/60 mt-2 text-sm font-medium">
                      No subservices created yet.
                    </p>
                  </div>
                )}
                <div className="mt-6 border-t border-slate-200/60 pt-4">
                  <Link
                    href="/subservices"
                    className="text-gradient-accent hover:text-cyan text-sm font-semibold transition-colors duration-200"
                  >
                    View all subservices →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10">
            <div className="mb-6 flex items-center">
              <div className="gradient-warning mr-3 flex h-8 w-8 items-center justify-center rounded-lg">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-navy-dark text-xl leading-6 font-bold">
                Quick Actions
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/categories/new"
                className="group focus-within:ring-cyan/30 shadow-elegant-lg hover:shadow-elegant-xl hover-lift relative rounded-2xl border border-slate-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 focus-within:ring-3"
              >
                <div>
                  <span className="gradient-primary inline-flex rounded-xl p-4 shadow-lg ring-4 ring-white">
                    <svg
                      className="h-7 w-7 text-white"
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
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-navy-dark text-lg font-bold">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Add Category
                  </h3>
                  <p className="text-navy-very-dark/60 mt-2 text-sm font-medium">
                    Create a new service category
                  </p>
                </div>
              </Link>

              <Link
                href="/subservices/new"
                className="group focus-within:ring-cyan/30 shadow-elegant-lg hover:shadow-elegant-xl hover-lift relative rounded-2xl border border-slate-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 focus-within:ring-3"
              >
                <div>
                  <span className="gradient-accent inline-flex rounded-xl p-4 shadow-lg ring-4 ring-white">
                    <svg
                      className="h-7 w-7 text-white"
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
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-navy-dark text-lg font-bold">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Add Subservice
                  </h3>
                  <p className="text-navy-very-dark/60 mt-2 text-sm font-medium">
                    Create a new subservice
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
