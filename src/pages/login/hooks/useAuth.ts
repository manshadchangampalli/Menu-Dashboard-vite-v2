import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "../service/login.api";
import type { ApiResponse } from "@/services/http";
import type { LoginRequest, LoginResponse } from "../service/login.type";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginAdmin(data),
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        toast.success("Login successful! Redirecting...");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed");
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });
};
