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
