import { ApiResponse, CategoriesQuery, SubservicesQuery, Category, Subservice } from '@/lib/types';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        data: null as T,
      };
    }
  }

  // Categories
  async getCategories(query: CategoriesQuery = {}) {
    const searchParams = new URLSearchParams();
    
    if (query.active !== undefined) searchParams.append('active', query.active.toString());
    if (query.featured !== undefined) searchParams.append('featured', query.featured.toString());
    if (query.search) searchParams.append('search', query.search);
    if (query.sortBy) searchParams.append('sortBy', query.sortBy);
    if (query.sortOrder) searchParams.append('sortOrder', query.sortOrder);
    if (query.page) searchParams.append('page', query.page.toString());
    if (query.limit) searchParams.append('limit', query.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ 
      categories: Category[]; 
      pagination: { 
        page: number; 
        limit: number; 
        total: number; 
        pages: number; 
      } 
    }>(endpoint);
  }

  async getCategoryById(id: string) {
    return this.request<Category>(`/categories/${id}`);
  }

  async getCategoriesWithCounts() {
    // Use the standard categories endpoint which already includes subservicesCount
    return this.getCategories({ active: true, limit: 50, sortBy: 'displayOrder', sortOrder: 'asc' });
  }

  // Subservices
  async getSubservices(query: SubservicesQuery = {}) {
    const searchParams = new URLSearchParams();
    
    if (query.categoryId) searchParams.append('categoryId', query.categoryId);
    if (query.active !== undefined) searchParams.append('active', query.active.toString());
    if (query.featured !== undefined) searchParams.append('featured', query.featured.toString());
    if (query.search) searchParams.append('search', query.search);
    if (query.sortBy) searchParams.append('sortBy', query.sortBy);
    if (query.sortOrder) searchParams.append('sortOrder', query.sortOrder);
    if (query.page) searchParams.append('page', query.page.toString());
    if (query.limit) searchParams.append('limit', query.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/subservices${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ 
      subservices: Subservice[]; 
      pagination: { 
        page: number; 
        limit: number; 
        total: number; 
        pages: number; 
      } 
    }>(endpoint);
  }

  async getSubserviceById(id: string) {
    return this.request<Subservice>(`/subservices/${id}`);
  }

  async getSubservicesByCategory(categoryId: string, query: Omit<SubservicesQuery, 'categoryId'> = {}) {
    const searchParams = new URLSearchParams();
    
    if (query.active !== undefined) searchParams.append('active', query.active.toString());
    if (query.featured !== undefined) searchParams.append('featured', query.featured.toString());
    if (query.search) searchParams.append('search', query.search);
    if (query.sortBy) searchParams.append('sort', query.sortBy);
    if (query.sortOrder) searchParams.append('order', query.sortOrder);
    if (query.page) searchParams.append('page', query.page.toString());
    if (query.limit) searchParams.append('limit', query.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/categories/${categoryId}/subservices${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ 
      category: { id: string; name: string; slug: string };
      subservices: Subservice[]; 
      pagination: { 
        page: number; 
        limit: number; 
        total: number; 
        pages: number; 
      } 
    }>(endpoint);
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

const apiClient = new ApiClient();
export default apiClient;
