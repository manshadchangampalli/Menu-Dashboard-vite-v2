import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type {
  GetMenuItemsRequest,
  MenuItem,
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "../menuItems.type";

export const getMenuItems = (params: GetMenuItemsRequest) => {
  return httpService.get<MenuItem[]>({
    endpoint: ApiEndpoints.GET_MENU_ITEMS,
    params,
  });
};

export const getMenuItem = (id: string) => {
  return httpService.get<MenuItem>({
    endpoint: `${ApiEndpoints.GET_MENU_ITEM}/${id}`,
  });
};

export const createMenuItem = (data: CreateMenuItemRequest) => {
  return httpService.post<MenuItem>({
    endpoint: ApiEndpoints.CREATE_MENU_ITEM,
    data,
  });
};

export const updateMenuItem = (id: string, data: UpdateMenuItemRequest) => {
  return httpService.patch<MenuItem>({
    endpoint: `${ApiEndpoints.UPDATE_MENU_ITEM}/${id}`,
    data,
  });
};

export const deleteMenuItem = (id: string) => {
  return httpService.delete({
    endpoint: `${ApiEndpoints.DELETE_MENU_ITEM}/${id}`,
  });
};
