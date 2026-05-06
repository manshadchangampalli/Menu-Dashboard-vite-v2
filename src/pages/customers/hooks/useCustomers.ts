import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomerById } from "../service/customers.api";
import type { GetCustomersRequest } from "../customer.type";

export const useCustomers = (params: GetCustomersRequest) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
  });
};

export const useCustomerById = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};
