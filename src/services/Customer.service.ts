import { ICustomer } from "@/interfaces/entities/customer.interface";
import { IPagination, ISearchWithLike } from "@/interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/customer";

export const Customer = {
  getList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list`, pagination);
  },

  searchWithLike(data: ISearchWithLike): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list/search`, data);
  },

  async findOne(id: string): Promise<ICustomer> {
    return await apiClient.get(`${modulePath}/${id}`);
  },

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
