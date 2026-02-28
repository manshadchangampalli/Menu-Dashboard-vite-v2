import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenuItems, createMenuItem } from "../service/menuItems.api";
import type { GetMenuItemsRequest, CreateMenuItemRequest } from "../menuItems.type";

export const useMenuItems = (params: GetMenuItemsRequest) => {
  return useQuery({
    queryKey: ["menu-items", params],
    queryFn: () => getMenuItems(params),
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
