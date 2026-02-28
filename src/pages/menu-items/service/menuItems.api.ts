import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { GetMenuItemsRequest, MenuItem, CreateMenuItemRequest } from "../menuItems.type";

export const getMenuItems = (params: GetMenuItemsRequest) => {
  return httpService.get<MenuItem[]>({
    endpoint: ApiEndpoints.GET_MENU_ITEMS,
    params,
  });
};

export const createMenuItem = (data: CreateMenuItemRequest) => {
  return httpService.post<MenuItem>({
    endpoint: ApiEndpoints.CREATE_MENU_ITEM,
    data,
  });
};
