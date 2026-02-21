import { useMutation } from "@tanstack/react-query";
import { loginAdmin, logoutAdmin } from "../service/login.api";
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
        localStorage.setItem("isLoggedIn", "true");
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

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logoutAdmin(),
    onSuccess: (response: ApiResponse<any>) => {
      if (response.success) {
        localStorage.removeItem("isLoggedIn");
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        toast.error(response.message || "Logout failed");
      }
    },
    onError: (error: any) => {
      console.error("Logout failed:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
      
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    },
  });
};
