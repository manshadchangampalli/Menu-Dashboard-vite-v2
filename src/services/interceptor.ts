import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const setupInterceptors = (instance: AxiosInstance) => {
  // Request Interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        
        // Only redirect if not already on the login page to avoid refresh loops
        if (window.location.pathname !== "/login") {
          console.warn("Unauthorized, redirecting to login...");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error.response?.data || error.message);
    }
  );
};
