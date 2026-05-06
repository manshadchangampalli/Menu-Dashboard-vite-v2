import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { CustomerData, GetCustomersRequest } from "../customer.type";

export const getCustomers = (params: GetCustomersRequest) => {
  return httpService.get<CustomerData[]>({
    endpoint: ApiEndpoints.GET_CUSTOMERS,
    params,
  });
};

export const getCustomerById = (id: string) => {
  return httpService.get<CustomerData>({
    endpoint: `${ApiEndpoints.GET_CUSTOMER}/${id}`,
  });
};
