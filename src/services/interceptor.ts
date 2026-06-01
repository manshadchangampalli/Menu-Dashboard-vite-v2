import { useAuthStore } from "@/store/auth/auth.store";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ApiEndpoints } from "./api-endpoints";

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const isRefreshUrl = (url?: string) => !!url && url.includes(ApiEndpoints.REFRESH);
const isAuthEntryUrl = (url?: string) =>
  !!url && (url.includes(ApiEndpoints.LOGIN) || url.includes(ApiEndpoints.LOGOUT));

export const setupInterceptors = (instance: AxiosInstance) => {
  let refreshPromise: Promise<void> | null = null;

  const refreshOnce = () => {
    if (!refreshPromise) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        return Promise.reject(new Error("Missing refresh token"));
      }
      const apiVersion = import.meta.env.VITE_API_VERSION || "v1";
      const baseURL = instance.defaults.baseURL?.replace(/\/$/, "") ?? "";
      refreshPromise = axios
        .post<{ access_token: string; refresh_token: string }>(
          `${baseURL}/${apiVersion}/${ApiEndpoints.REFRESH}`,
          { refresh_token: refreshToken },
        )
        .then((res) => {
          if (res.data?.access_token) {
            localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
          }
          if (res.data?.refresh_token) {
            localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token);
          }
        })
        .finally(() => {
          refreshPromise = null;
        });
    }
    return refreshPromise;
  };

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const original = error.config as RetryableConfig | undefined;

      if (
        status === 401 &&
        original &&
        !original._retry &&
        !isRefreshUrl(original.url) &&
        !isAuthEntryUrl(original.url)
      ) {
        original._retry = true;
        try {
          await refreshOnce();
          return instance(original);
        } catch {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          useAuthStore.getState().clearUser();
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }

      return Promise.reject(error.response?.data || error.message);
    },
  );
};
