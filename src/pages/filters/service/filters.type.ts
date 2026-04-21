export enum FilterType {
  SINGLE = "single",
  MULTI = "multi",
  RANGE = "range",
}

export enum FilterSource {
  TYPE = "type",
  SPICE_LEVEL = "spice_level",
  TAG = "tag",
  FEATURED = "featured",
  PRICE = "price",
}

export enum SortField {
  PRICE = "price",
  NAME = "name",
  FEATURED = "featured",
  CREATED_AT = "created_at",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface FilterOption {
  label: string;
  value: string;
  sort_order?: number;
}

export interface FilterRange {
  label: string;
  min: number;
  max?: number | null;
  sort_order?: number;
}

export interface Filter {
  _id: string;
  organization_id: string;
  name: string;
  type: FilterType;
  source: FilterSource;
  options: FilterOption[];
  ranges: FilterRange[];
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFilterRequest {
  name: string;
  type: FilterType;
  source: FilterSource;
  options?: FilterOption[];
  ranges?: FilterRange[];
  sort_order?: number;
  is_active?: boolean;
}

export interface SortOption {
  _id: string;
  organization_id: string;
  label: string;
  field: SortField;
  direction: SortDirection;
  is_default: boolean;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSortOptionRequest {
  label: string;
  field: SortField;
  direction: SortDirection;
  is_default?: boolean;
  sort_order?: number;
  is_active?: boolean;
}
