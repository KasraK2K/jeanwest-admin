import axios from "axios";
import { globals } from "@/common/globals/globals";
import Store from "@/store/index.store";

export const apiClient = axios.create({
  baseURL: globals.baseURL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// middleware allways run before each request
apiClient.interceptors.request.use((config) => {
  const token = Store.state.token;
  if (token) config.headers.common.Authorization = `Bearer ${token}`;
  return config;
});

// middleware allways run after receive each request
apiClient.interceptors.response.use((response) => {
  if (response.data && response.data.data) response.data = response.data.data;
  return response;
});

export const removeEmptyKey: (
  data: Record<string, unknown>
) => Record<string, unknown> = (data: Record<string, unknown>) => {
  for (const key in data) {
    if (!data[key] && typeof data[key] !== "boolean" && data[key] !== 0) {
      delete data[key];
    }
  }
  return data;
};
