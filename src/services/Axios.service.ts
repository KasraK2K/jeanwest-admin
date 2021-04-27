import axios from "axios";
import { globals } from "@/common/globals/globals";

export const apiClient = axios.create({
  baseURL: globals.baseURL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
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
