import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../service/menuItems.api";
import type { GetMenuItemsRequest } from "../menuItems.type";

export const useMenuItems = (params: GetMenuItemsRequest) => {
  return useQuery({
    queryKey: ["menu-items", params],
    queryFn: () => getMenuItems(params),
  });
};
