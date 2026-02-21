import axios from "axios";
import { setupInterceptors } from "./interceptor";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

setupInterceptors(instance);

export { instance };
export default instance;
