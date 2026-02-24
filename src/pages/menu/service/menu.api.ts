import httpService from "../../../services/http";
import { ApiEndpoints } from "../../../services/api-endpoints";
import type { CreateMenuRequest, Menu, GetMenusRequest } from "./menu.type";

export const createMenu = (data: CreateMenuRequest) => {
  return httpService.post<Menu>({
    endpoint: ApiEndpoints.CREATE_MENU,
    data,
  });
};

export const getMenus = (params: GetMenusRequest) => {
  return httpService.get<Menu[]>({
    endpoint: ApiEndpoints.GET_MENUS,
    params,
  });
};

export const updateMenu = (id: string, data: Partial<CreateMenuRequest>) => {
  return httpService.patch<Menu>({
    endpoint: `${ApiEndpoints.UPDATE_MENU}/${id}`,
    data,
  });
};

export const deleteMenu = (id: string) => {
  return httpService.delete<void>({
    endpoint: `${ApiEndpoints.DELETE_MENU}/${id}`,
  });
};
