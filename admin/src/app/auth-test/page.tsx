'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';

interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}
export default function AuthTestPage() {
  const [authStatus, setAuthStatus] = useState<{
    isAuthenticated: boolean;
    token: string | null;
    profile: AdminProfile | null;
    error: string | null;
  }>({
    isAuthenticated: false,
    token: null,
    profile: null,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = apiClient.isAuthenticated();
        const token = apiClient.getToken();
        
        setAuthStatus(prev => ({
          ...prev,
          isAuthenticated: isAuth,
          token: token,
        }));

        if (isAuth && token) {
          try {
            const profileResult = await apiClient.getProfile();
            setAuthStatus(prev => ({
              ...prev,
              profile: profileResult.data,
            }));
          } catch (profileError: unknown) {
            const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown error';
            setAuthStatus(prev => ({
              ...prev,
              error: `Profile fetch error: ${errorMessage}`,
            }));
          }
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setAuthStatus(prev => ({
          ...prev,
          error: `Auth check error: ${errorMessage}`,
        }));
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      window.location.reload();
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Status</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <strong>Is Authenticated:</strong> 
          <span className={`ml-2 px-2 py-1 rounded text-sm ${
            authStatus.isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {authStatus.isAuthenticated ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div>
          <strong>Token:</strong>
          <div className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono break-all">
            {authStatus.token || 'No token found'}
          </div>
        </div>
        
        {authStatus.profile && (
          <div>
            <strong>Profile:</strong>
            <div className="mt-1 p-2 bg-gray-100 rounded text-sm">
              <div>Name: {authStatus.profile.name}</div>
              <div>Email: {authStatus.profile.email}</div>
              <div>Role: {authStatus.profile.role}</div>
              <div>Active: {authStatus.profile.isActive ? 'Yes' : 'No'}</div>
            </div>
          </div>
        )}
        
        {authStatus.error && (
          <div>
            <strong>Error:</strong>
            <div className="mt-1 p-2 bg-red-100 text-red-800 rounded text-sm">
              {authStatus.error}
            </div>
          </div>
        )}
        
        <div className="flex gap-4 mt-6">
          {!authStatus.isAuthenticated ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
