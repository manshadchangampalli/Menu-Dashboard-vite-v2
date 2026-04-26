import { useAuthStore } from "@/store/auth/auth.store";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ApiEndpoints } from "./api-endpoints";

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const isRefreshUrl = (url?: string) => !!url && url.includes(ApiEndpoints.REFRESH);
const isAuthEntryUrl = (url?: string) =>
  !!url && (url.includes(ApiEndpoints.LOGIN) || url.includes(ApiEndpoints.LOGOUT));

export const setupInterceptors = (instance: AxiosInstance) => {
  let refreshPromise: Promise<void> | null = null;

  const refreshOnce = () => {
    if (!refreshPromise) {
      refreshPromise = axios
        .post(
          `${instance.defaults.baseURL?.replace(/\/$/, "") ?? ""}/${ApiEndpoints.REFRESH}`,
          {},
          { withCredentials: true },
        )
        .then(() => undefined)
        .finally(() => {
          refreshPromise = null;
        });
    }
    return refreshPromise;
  };

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
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
