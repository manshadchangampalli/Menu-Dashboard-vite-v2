import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { CreateProductRequest, Product, GetProductsRequest } from "./products.type";

export const createProduct = (data: CreateProductRequest) => {
  return httpService.post<Product>({
    endpoint: ApiEndpoints.CREATE_PRODUCT,
    data,
  });
};

export const getProducts = (params: GetProductsRequest) => {
  return httpService.get<Product[]>({
    endpoint: ApiEndpoints.GET_PRODUCTS,
    params,
  });
};

export const updateProduct = (id: string, data: Partial<CreateProductRequest>) => {
  return httpService.patch<Product>({
    endpoint: `${ApiEndpoints.UPDATE_PRODUCT}/${id}`,
    data,
  });
};

export const deleteProduct = (id: string) => {
  return httpService.delete<void>({
    endpoint: `${ApiEndpoints.DELETE_PRODUCT}/${id}`,
  });
};

export const downloadProducts = () => {
  return httpService.get({
    endpoint: ApiEndpoints.DOWNLOAD_PRODUCTS,
    responseType: "blob",
  });
};

