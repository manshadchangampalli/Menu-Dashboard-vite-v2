export enum ProductType {
  VEG = 'veg',
  NON_VEG = 'non_veg',
  VEGAN = 'vegan',
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  THREE_D = '3d',
}

export enum MediaFormat {
  GLB = 'glb',
  USDZ = 'usdz',
}

export enum SpiceLevel {
  NONE = 'none',
  MILD = 'mild',
  MEDIUM = 'medium',
  HOT = 'hot',
  EXTRA_HOT = 'extra_hot',
}


export interface ProductMedia {
  url: string;
  type: MediaType;
  format: MediaFormat;
  is_primary: boolean;
  order: number;
  alt_text: string;
}

export interface NutritionalInfo {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  sku: string;
  type: ProductType;
  spice_level: SpiceLevel;
  is_alcohol: boolean;
  is_featured: boolean;
  base_price: number;
  base_tax_rate: number;
  calories: number;
  nutritional_info: NutritionalInfo;
  media: ProductMedia[];
  tags: string[];
  allergens: string[];
  is_active: boolean;
  organization_id: string;
}

export interface Product {
  _id: string;
  product_uuid: string;
  name: string;
  slug: string;
  description: string;
  sku: string;
  type: ProductType;
  spice_level: SpiceLevel;
  is_alcohol: boolean;
  is_featured: boolean;
  base_price: number;
  base_tax_rate: number;
  calories: number;
  nutritional_info: NutritionalInfo;
  media: ProductMedia[];
  tags: string[];
  allergens: string[];
  is_active: boolean;
  is_deleted: boolean;
  organization_id: string;
  created_at: string;
  updated_at: string;
  __v?: number;
}

export interface GetProductsRequest {
  query?: string;
  page?: number;
  limit?: number;
  organization_id?: string;
  type?: ProductType;
  is_active?: boolean;
  is_featured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetProductsResponse {
  timestamp: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
