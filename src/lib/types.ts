// Frontend types for CafPotranto website

export interface ImageFile {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image?: ImageFile;
  isActive: boolean;
  displayOrder: number;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  subservicesCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subservice {
  _id: string;
  categoryId: string;
  category?: Category;
  name: string;
  description: string;
  shortDescription?: string;
  price_start: number;
  secretarialFees?: number;
  vatPercentage?: number;
  priceType: 'fixed' | 'starting_from' | 'hourly' | 'consultation';
  rating: number;
  reviews_count: number;
  notes?: string;
  slug: string;
  image?: ImageFile;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  tags: string[];
  features: ServiceFeature[];
  requirements: ServiceRequirement[];
  estimatedDuration?: {
    value: number;
    unit: 'hours' | 'days' | 'weeks' | 'months';
  };
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  stats?: {
    views: number;
    inquiries: number;
    bookings: number;
  };
  formattedPrice?: string;
  ratingDisplay?: string;
  // Pricing calculation virtuals
  subtotal?: number;
  vatAmount?: number;
  totalPrice?: number;
  pricingBreakdown?: {
    serviceFee: string;
    secretarialFees: string;
    subtotal: string;
    vatPercentage: number;
    vatAmount: string;
    totalPrice: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceFeature {
  name: string;
  description: string;
  isIncluded: boolean;
}

export interface ServiceRequirement {
  name: string;
  description: string;
  isRequired: boolean;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// API query parameters
export interface CategoriesQuery {
  page?: number;
  limit?: number;
  active?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: 'name' | 'displayOrder' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface SubservicesQuery {
  categoryId?: string;
  page?: number;
  limit?: number;
  active?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: 'name' | 'displayOrder' | 'price_start' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}

// Frontend component props
export interface ServiceCardProps {
  category: Category;
  subservicesCount?: number;
  className?: string;
}

export interface ServicesGridProps {
  categories: Category[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

// API client configuration
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

// Error types
export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: any;
}

// Hook types
export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
  preferredContact?: 'email' | 'phone';
}

// Service inquiry types
export interface ServiceInquiry {
  serviceId: string;
  serviceName: string;
  customerInfo: ContactFormData;
  additionalNotes?: string;
  urgency?: 'low' | 'medium' | 'high';
  budget?: {
    min: number;
    max: number;
  };
}
