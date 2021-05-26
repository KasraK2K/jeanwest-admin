import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/notification";

export default {
  /**
   * @param { Record<string, unknown> } filter
   */
  async getList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient(`${modulePath}/list`, {
      method: "POST",
      data: filter,
    });
  },

  async findOne(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/${id}`);
  },

  async create(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient(modulePath, { method: "POST", data });
  },

  async edit(
    data: Record<string, unknown>,
    id: string
  ): Promise<AxiosResponse> {
    return await apiClient(`${modulePath}/${id}`, { method: "PATCH", data });
  },

  // async softDelete() {},
};
