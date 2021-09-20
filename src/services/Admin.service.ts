import { IPagination } from "@/interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/admin";

export const Admin = {
  getList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list`, pagination);
  },

  // async findOne(id: string): Promise<AxiosResponse> {
  //   return await apiClient.get(`${modulePath}/${id}`);
  // },

  // async create(data: Record<string, unknown>): Promise<AxiosResponse> {
  //   return await apiClient.post(modulePath, data);
  // },

  edit(data: Record<string, unknown>): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/edit`, data);
  },

  toggleCustomer(
    id: string,
    data: Record<string, unknown>
  ): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/deactivate/customer/${id}`, data);
  },

  // async softDelete() {},
};
