import type { Category } from "../../categories/service/categories.type";

export enum MenuType {
  DINE_IN = 'DINE-IN',
  DELIVERY = 'DELIVERY',
  BOTH = 'BOTH',
}


export enum MenuStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface CreateMenuRequest {
  name: string;
  type: MenuType;
  description: string;
  start_time: string;
  end_time: string;
  status: MenuStatus;
  isActive: boolean;
  organization_id: string;
  categoryCount?: number;
  itemCount?: number;
}

export interface Menu {
  _id: string;
  name: string;
  type: MenuType;
  description: string;
  start_time: string;
  end_time: string;
  status: MenuStatus;
  isActive: boolean;
  organization_id: string;
  categoryCount: number;
  itemCount: number;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  __v?: number;
}

export interface GetMenusRequest {
  query?: string;
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
