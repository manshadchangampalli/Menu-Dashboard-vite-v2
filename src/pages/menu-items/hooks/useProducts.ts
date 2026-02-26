import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "../service/products.api";
import type { CreateProductRequest, GetProductsRequest } from "../service/products.type";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useProducts = (params: GetProductsRequest) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};
