import { IOrder } from "@/interfaces/entities/order.interface";
import { IPagination, ISearchWithLike } from "@/interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/order";

export const Order = {
  getList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list`, pagination);
  },

  searchWithLike(data: ISearchWithLike): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/list/search`, data);
  },

  findOne(id: string): Promise<IOrder> {
    return apiClient.get(`${modulePath}/${id}`);
  },
};
