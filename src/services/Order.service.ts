import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/order";

export const Order = {
  getList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list`, pagination);
  },

  findOne(id: string): Promise<AxiosResponse> {
    return apiClient.get(`${modulePath}/${id}`);
  },
};
