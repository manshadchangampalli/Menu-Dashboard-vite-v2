import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { Order } from "../order.type";

export interface OrdersRequest {
  page?: string | number;
  limit?: string | number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateOrderRequest {
  branch_id?: string;
  items: {
    menu_item_id: string;
    name: string;
    quantity: number;
    unit_price: number;
  }[];
  customer_name?: string;
  customer_phone?: string;
  table_number?: string;
  notes?: string;
}

// httpService.get<T> returns ApiResponse<T> where .data = T and .meta = pagination
export const getOrders = (params: OrdersRequest) => {
  return httpService.get<Order[]>({
    endpoint: ApiEndpoints.GET_ORDERS,
    params,
  });
};

export const getOrderById = (id: string) => {
  return httpService.get<Order>({
    endpoint: `${ApiEndpoints.GET_ORDERS}/${id}`,
  });
};

export const createOrder = (data: CreateOrderRequest) => {
  return httpService.post<any>({
    endpoint: ApiEndpoints.GET_ORDERS,
    data,
  });
};
export const updateOrderStatus = (id: string, status: string) => {
  return httpService.patch<Order>({
    endpoint: `${ApiEndpoints.GET_ORDERS}/${id}/status`,
    data: { status },
  });
};
