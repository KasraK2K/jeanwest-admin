import { IPagination } from "@/interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/ticket";

export default {
  /**
   * @param { Record<string, unknown> } filter
   */
  async getList(
    pagination: IPagination,
    token: string
  ): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/admin/list`, pagination, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },

  async reply(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/admin/reply`, data);
  },

  // async findOne(id: string): Promise<AxiosResponse> {
  //   return await apiClient.get(`${modulePath}/${id}`);
  // },

  // async create(data: Record<string, unknown>): Promise<AxiosResponse> {
  //   return await apiClient.post(modulePath, data);
  // },

  // async edit(
  //   data: Record<string, unknown>,
  //   id: string
  // ): Promise<AxiosResponse> {
  //   return await apiClient.patch(`${modulePath}/${id}`, data);
  // },

  // async softDelete() {},
};
