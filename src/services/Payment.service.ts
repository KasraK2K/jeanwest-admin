import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/payment";

export default {
  async getList(pagination: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/list`, pagination);
  },

  async findOne(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/${id}`);
  },

  async create(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(modulePath, data);
  },
};
