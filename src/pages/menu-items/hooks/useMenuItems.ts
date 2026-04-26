import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../service/menuItems.api";
import type {
  GetMenuItemsRequest,
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "../menuItems.type";

export const useMenuItems = (params: GetMenuItemsRequest) => {
  return useQuery({
    queryKey: ["menu-items", params],
    queryFn: () => getMenuItems(params),
  });
};

export const useMenuItem = (id: string | null) => {
  return useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => getMenuItem(id as string),
    enabled: !!id,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuItemRequest) => createMenuItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuItemRequest }) =>
      updateMenuItem(id, data),
    onSuccess: (_res, vars) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-item", vars.id] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};
