export interface MenuItem {
  _id: string;
  menu_item_uuid: string;
  product_id: {
    _id: string;
    name: string;
    slug: string;
    type: string;
  };
  menu_id: string;
  category_id: string;
  organization_id: string;
  branch_id?: string;
  base_price: number;
  selling_price: number;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  __v?: number;
}

export interface CreateMenuItemRequest {
  product_id: string;
  menu_id: string;
  category_id: string;
  organization_id: string;
  base_price: number;
  selling_price: number;
  is_available: boolean;
  branch_id: string;
}

export interface GetMenuItemsRequest {
  menuId?: string;
  categoryId?: string;
  organization_id?: string;
  page?: number;
  limit?: number;
}

export interface GetMenuItemsResponse {
  success: boolean;
  data: MenuItem[];
  meta: {
    timestamp: string;
  };
}
