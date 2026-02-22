import { HEADERS } from "@/lib/constant";
import { instance } from "./instance";

const DEFAULT_API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
  meta: {
    timestamp: string;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    [key: string]: any;
}
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  showToast?: boolean;
}

export interface ApiRequestConfig<T = any> {
  endpoint: string;
  data?: T;
  locale?: string;
  version?: string; // Optional version override
  hideToast?: boolean;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  credentials?: boolean;
  responseType?: "json" | "blob";
}

export interface UploadRequestConfig {
  endpoint: string;
  files: File | File[];
  additionalData?: Record<string, any>;
  locale?: string;
  version?: string; // Optional version override
  hideToast?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

class HttpService {
  private axiosInstance = instance;

  constructor() {}

  private getFullUrl(endpoint: string, version?: string): string {
    const v = version || DEFAULT_API_VERSION;
    // Clean up slashes for safe concatenation
    const cleanVersion = v.replace(/^\/|\/$/g, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    return `/${cleanVersion}/${cleanEndpoint}`;
  }

  private createRequestConfig<T>(config: ApiRequestConfig<T>): { axiosConfig: any; headers: Record<string, string> } {
    const headers: Record<string, string> = {
      ...config.headers,
    };

    if (config.locale) {
      headers[HEADERS.LOCALE] = config.locale;
    }

    const axiosConfig = {
      headers,
      timeout: config.timeout,
      signal: config.signal,
      fetchOptions: {
        toast: !config.hideToast,
      },
      withCredentials: config.credentials,
      responseType: config.responseType ?? undefined,
    };

    return { axiosConfig, headers };
  }

  async get<T = any>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    try {
      const { axiosConfig } = this.createRequestConfig(config);
      const url = this.getFullUrl(config.endpoint, config.version);
      const response = await this.axiosInstance.get<ApiResponse<T>>(url, {
        ...axiosConfig,
        params: config.params,
      });
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T = any, D = any>(config: ApiRequestConfig<D>): Promise<ApiResponse<T>> {
    try {
      const { axiosConfig } = this.createRequestConfig(config);
      const url = this.getFullUrl(config.endpoint, config.version);
      const response = await this.axiosInstance.post<ApiResponse<T>>(url, config.data, axiosConfig);

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async postAsFormData<T = any>(config: ApiRequestConfig<Record<string, any>>): Promise<ApiResponse<T>> {
    const formData = new FormData();

    if (config.data) {
      Object.entries(config.data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, String(item));
            });
          } else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
    }

    try {
      const { axiosConfig } = this.createRequestConfig(config);
      const url = this.getFullUrl(config.endpoint, config.version);
      const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T = any, D = any>(config: ApiRequestConfig<D>): Promise<ApiResponse<T>> {
    try {
      const { axiosConfig } = this.createRequestConfig(config);
      const url = this.getFullUrl(config.endpoint, config.version);
      const response = await this.axiosInstance.put<ApiResponse<T>>(url, config.data, axiosConfig);

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<T = any, D = any>(config: ApiRequestConfig<D>): Promise<ApiResponse<T>> {
    try {
      const { axiosConfig } = this.createRequestConfig(config);
      const url = this.getFullUrl(config.endpoint, config.version);
      const response = await this.axiosInstance.patch<ApiResponse<T>>(url, config.data, axiosConfig);

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T = any>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    try {
      const { axiosConfig } = this.createRequestConfig(config);
      const url = this.getFullUrl(config.endpoint, config.version);
      const response = await this.axiosInstance.delete<ApiResponse<T>>(url, {
        ...axiosConfig,
        data: config.data,
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async upload<T = any>(config: UploadRequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData();

    if (Array.isArray(config.files)) {
      config.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    } else {
      formData.append("file", config.files);
    }

    if (config.additionalData) {
      Object.entries(config.additionalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
    }

    try {
      const { axiosConfig } = this.createRequestConfig({
        endpoint: config.endpoint,
        locale: config.locale,
        version: config.version,
        hideToast: config.hideToast,
        headers: config.headers,
        timeout: config.timeout,
        signal: config.signal,
      });

      const url = this.getFullUrl(config.endpoint, config.version);

      const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}

const httpService = new HttpService();

export { HttpService };

export default httpService;
