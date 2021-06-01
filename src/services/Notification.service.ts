import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/notification";

export default {
  /**
   * @param { Record<string, unknown> } filter
   */
  async getList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/list`, filter);
  },

  async findOne(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/${id}`);
  },

  async create(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(modulePath, data);
  },

  async edit(
    data: Record<string, unknown>,
    id: string
  ): Promise<AxiosResponse> {
    return await apiClient.patch(`${modulePath}/${id}`, data);
  },

  // async softDelete() {},
};
