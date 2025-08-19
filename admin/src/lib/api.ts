import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<ApiResponse>) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError<ApiResponse>) {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          this.removeToken();
          toast.error('Session expired. Please login again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          break;
        case 403:
          toast.error('Access denied. Insufficient permissions.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 422:
        case 400:
          if (data?.errors && Array.isArray(data.errors)) {
            data.errors.forEach((err: any) => {
              toast.error(err.msg || err.message || 'Validation error');
            });
          } else {
            toast.error(data?.message || 'Validation error');
          }
          break;
        case 423:
          this.removeToken();
          toast.error('Account is locked due to too many failed login attempts. Please login again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          break;
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        case 500:
          toast.error('Internal server error. Please try again.');
          break;
        default:
          toast.error(data?.message || 'An unexpected error occurred');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('Request failed. Please try again.');
    }
  }

  // Token management
  public setToken(token: string) {
    Cookies.set('admin_token', token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
  }

  public getToken(): string | null {
    return Cookies.get('admin_token') || null;
  }

  public removeToken() {
    Cookies.remove('admin_token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // HTTP Methods
  async get<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.get(url, { params });
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.put(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.delete(url);
    return response.data;
  }

  // File upload helper
  async uploadFile<T = any>(url: string, file: File, additionalData?: any, method: 'POST' | 'PUT' = 'POST'): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('image', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        const value = additionalData[key];
        if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    let response: AxiosResponse<ApiResponse<T>>;
    
    if (method === 'PUT') {
      response = await this.instance.put(url, formData, config);
    } else {
      response = await this.instance.post(url, formData, config);
    }
    
    return response.data;
  }

  // Specific API methods
  
  // Auth
  async login(email: string, password: string) {
    return this.post('/auth/login', { email, password });
  }

  async logout() {
    const result = await this.post('/auth/logout');
    this.removeToken();
    return result;
  }

  async getProfile() {
    return this.get('/auth/me');
  }

  async updateProfile(data: any) {
    return this.put('/auth/profile', data);
  }

  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    return this.put('/auth/change-password', {
      currentPassword,
      newPassword,
      confirmPassword,
    });
  }

  // Categories
  async getCategories(params?: any) {
    return this.get('/categories', params);
  }

  async getCategory(id: string) {
    return this.get(`/categories/${id}`);
  }

  async createCategory(data: any, file?: File) {
    if (file) {
      return this.uploadFile('/categories', file, data);
    }
    return this.post('/categories', data);
  }

  async updateCategory(id: string, data: any, file?: File) {
    if (file) {
      return this.uploadFile(`/categories/${id}`, file, data, 'PUT');
    }
    return this.put(`/categories/${id}`, data);
  }

  async deleteCategory(id: string) {
    return this.delete(`/categories/${id}`);
  }

  async getCategorySubservices(id: string, params?: any) {
    return this.get(`/categories/${id}/subservices`, params);
  }

  // Subservices
  async getSubservices(params?: any) {
    return this.get('/subservices', params);
  }

  async getSubservice(id: string) {
    return this.get(`/subservices/${id}`);
  }

  async createSubservice(data: any, file?: File) {
    // Ensure arrays are properly handled
    const processedData = {
      ...data,
      tags: data.tags || [],
      features: data.features || [],
      requirements: data.requirements || [],
      metadata: data.metadata || {}
    };

    if (file) {
      return this.uploadFile('/subservices', file, processedData);
    }
    return this.post('/subservices', processedData);
  }

  async updateSubservice(id: string, data: any, file?: File) {
    // Ensure arrays are properly handled
    const processedData = {
      ...data,
      tags: data.tags || [],
      features: data.features || [],
      requirements: data.requirements || [],
      metadata: data.metadata || {}
    };

    if (file) {
      return this.uploadFile(`/subservices/${id}`, file, processedData, 'PUT');
    }
    return this.put(`/subservices/${id}`, processedData);
  }

  async deleteSubservice(id: string) {
    return this.delete(`/subservices/${id}`);
  }

  async getFeaturedSubservices(limit?: number) {
    return this.get('/subservices/featured', { limit });
  }

  async searchSubservices(query: string, params?: any) {
    return this.get('/subservices/search', { q: query, ...params });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

export default apiClient;
