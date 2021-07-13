import { IPagination } from "@/interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/admin";

export default {
  async getList(
    pagination: IPagination,
    token: string
  ): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/list`, pagination, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },

  // async findOne(id: string): Promise<AxiosResponse> {
  //   return await apiClient.get(`${modulePath}/${id}`);
  // },

  // async create(data: Record<string, unknown>): Promise<AxiosResponse> {
  //   return await apiClient.post(modulePath, data);
  // },

  async edit(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.patch(`${modulePath}/edit`, data);
  },

  // async softDelete() {},
};
