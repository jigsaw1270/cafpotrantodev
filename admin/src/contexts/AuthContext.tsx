'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { Admin } from '@/types';
import { toast } from 'react-toastify';

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Admin>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!admin && apiClient.isAuthenticated();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (apiClient.isAuthenticated()) {
        const response = await apiClient.getProfile();
        if (response.success && response.data) {
          setAdmin(response.data.admin);
        } else {
          apiClient.removeToken();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      apiClient.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('🔐 Attempting login for:', email);
      console.log('🔗 Making request to backend...');
      
      const response = await apiClient.login(email, password);
      console.log('📡 Login response:', response);
      
      if (response.success && response.data) {
        const { token, admin: adminData } = response.data;
        console.log('✅ Login successful, setting token and admin data');
        console.log('🔑 Token received:', token?.substring(0, 20) + '...');
        console.log('👤 Admin data:', adminData);
        
        apiClient.setToken(token);
        setAdmin(adminData);
        toast.success('Login successful!');
        
        console.log('🚀 Redirecting to dashboard...');
        router.push('/dashboard');
        return true;
      } else {
        console.error('❌ Login failed:', response.message);
        toast.error(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      toast.error('Network error. Please check if the server is running.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.logout();
      setAdmin(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      apiClient.removeToken();
      setAdmin(null);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Admin>): Promise<boolean> => {
    try {
      const response = await apiClient.updateProfile(data);
      
      if (response.success && response.data) {
        setAdmin(response.data.admin);
        toast.success('Profile updated successfully');
        return true;
      } else {
        toast.error(response.message || 'Profile update failed');
        return false;
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
