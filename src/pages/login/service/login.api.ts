import httpService from "@/services/http";
import type { LoginRequest, LoginResponse } from "./login.type";

export const loginAdmin = (data: LoginRequest) => {
  return httpService.post<LoginResponse>({
    endpoint: "auth/admin/login",
    data,
  });
};
