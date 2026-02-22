import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { CreateCategoryRequest, Category } from "./categories.type";

export const createCategory = (data: CreateCategoryRequest) => {
  return httpService.post<Category>({
    endpoint: ApiEndpoints.CREATE_CATEGORY,
    data,
  });
};

export const getCategories = () => {
  return httpService.get<Category[]>({
    endpoint: ApiEndpoints.GET_CATEGORIES,
  });
};

export const deleteCategory = (id: string) => {
  return httpService.delete<void>({
    endpoint: `${ApiEndpoints.DELETE_CATEGORY}/${id}`,
  });
};
