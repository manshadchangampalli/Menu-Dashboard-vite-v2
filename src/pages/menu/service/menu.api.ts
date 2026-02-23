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
