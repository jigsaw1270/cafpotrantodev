export interface Admin {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image?: ImageFile;
  isActive: boolean;
  status: 'active' | 'inactive';
  displayOrder: number;
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  subservicesCount: number;
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
  price?: {
    amount: number;
    type: string;
  };
  priceType: 'fixed' | 'starting_from' | 'hourly' | 'consultation';
  rating: number;
  reviews_count: number;
  notes?: string;
  slug: string;
  image?: ImageFile;
  isActive: boolean;
  status: 'active' | 'inactive';
  isFeatured: boolean;
  displayOrder: number;
  tags: string[];
  features: ServiceFeature[];
  requirements: ServiceRequirement[];
  estimatedDuration?: {
    value: number;
    unit: 'hours' | 'days' | 'weeks' | 'months';
  };
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  stats: {
    views: number;
    inquiries: number;
    bookings: number;
  };
  formattedPrice?: string;
  ratingDisplay?: string;
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

export interface ImageFile {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
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

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationData;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface CategoryFormData {
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  image?: FileList;
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
}

export interface SubserviceFormData {
  categoryId: string;
  name: string;
  description: string;
  shortDescription?: string;
  price_start: number;
  priceType: 'fixed' | 'starting_from' | 'hourly' | 'consultation';
  rating: number;
  reviews_count: number;
  notes?: string;
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
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  image?: File;
}

export interface FilterOptions {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  active?: boolean;
  featured?: boolean;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface DashboardStats {
  totalCategories: number;
  totalSubservices: number;
  activeSubservices: number;
  featuredSubservices: number;
  totalViews: number;
  totalInquiries: number;
  recentCategories: Category[];
  recentSubservices: Subservice[];
  popularSubservices: Subservice[];
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  message: string;
  isLoading?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: PaginationData;
  onPageChange?: (page: number) => void;
  onSort?: (field: string, order: 'asc' | 'desc') => void;
  isLoading?: boolean;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

// Hook Types
export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseTableResult<T> {
  data: T[];
  pagination: PaginationData;
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
  refetch: () => Promise<void>;
  handleSort: (field: string) => void;
  handlePageChange: (page: number) => void;
}

// Enum Types
export enum UserRole {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export enum PriceType {
  FIXED = 'fixed',
  STARTING_FROM = 'starting_from',
  HOURLY = 'hourly',
  CONSULTATION = 'consultation',
}

export enum DurationUnit {
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
}
