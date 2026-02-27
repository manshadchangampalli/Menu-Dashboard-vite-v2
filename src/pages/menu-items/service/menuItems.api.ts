import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { GetMenuItemsRequest, GetMenuItemsResponse, MenuItem } from "../menuItems.type";

export const getMenuItems = (params: GetMenuItemsRequest) => {
  return httpService.get<MenuItem[]>({
    endpoint: ApiEndpoints.GET_MENU_ITEMS,
    params,
  });
};

// We'll add create/update/delete here as needed
