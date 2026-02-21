import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { LoginRequest, LoginResponse } from "./login.type";

export const loginAdmin = (data: LoginRequest) => {
  return httpService.post<LoginResponse>({
    endpoint: ApiEndpoints.LOGIN,
    data,
  });
};

export const logoutAdmin = () => {
  return httpService.post({
    endpoint: ApiEndpoints.LOGOUT,
  });
};
