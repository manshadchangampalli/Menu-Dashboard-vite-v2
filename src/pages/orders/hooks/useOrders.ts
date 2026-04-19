import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, getOrderById, createOrder, updateOrderStatus, type CreateOrderRequest } from "../service/order.api";

export const useOrders = (options: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  const { page = 1, limit = 10, status, search = "", sortBy = "created_at", sortOrder = "desc" } = options;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders", { page, limit, status, search, sortBy, sortOrder }],
    queryFn: async () => {
      const response = await getOrders({
        page,
        limit,
        status,
        search,
        sortBy,
        sortOrder,
      });
      // httpService.get returns ApiResponse directly: { data: [...], meta: {...}, success, message }
      return {
        data: response.data,
        total: response.meta?.total ?? 0,
        totalPages: response.meta?.totalPages ?? 0,
      };
    },
  });

  return {
    orders: data?.data || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isError,
    refetch,
  };
};

export const useOrderById = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await getOrderById(id!);
      return response.data;
    },
    enabled: !!id,
  });

  return { order: data, isLoading, isError };
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
};
