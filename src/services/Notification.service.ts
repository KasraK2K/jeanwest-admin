import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/notification";

export const Notification = {
  getList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list`, pagination);
  },

  findOne(id: string): Promise<AxiosResponse> {
    return apiClient.get(`${modulePath}/${id}`);
  },

  create(data: Record<string, unknown>): Promise<AxiosResponse> {
    return apiClient.post(modulePath, data);
  },

  edit(data: Record<string, unknown>, id: string): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/${id}`, data);
  },

  softDelete(id: string): Promise<AxiosResponse> {
    return apiClient.delete(`${modulePath}/${id}`);
  },

  restore(id: string): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/restore/${id}`);
  },
};
