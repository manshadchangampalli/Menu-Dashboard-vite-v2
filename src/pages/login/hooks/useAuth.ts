import { useMutation } from "@tanstack/react-query";
import { loginAdmin, logoutAdmin } from "../service/login.api";
import type { ApiResponse } from "@/services/http";
import type { LoginRequest, LoginResponse } from "../service/login.type";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth/auth.store";

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginRequest) => loginAdmin(data),
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      if (response.success && response.data?.user) {
        setUser(response.data.user);
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
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => logoutAdmin(),
    onSettled: () => {
      clearUser();
      navigate("/login");
    },
    onSuccess: (response: ApiResponse<any>) => {
      if (response.success) {
        toast.success("Logged out successfully");
      } else {
        toast.error(response.message || "Logout failed");
      }
    },
    onError: (error: any) => {
      console.error("Logout failed:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });
};
