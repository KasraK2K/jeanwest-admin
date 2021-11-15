import { IPagination } from "@/interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/ticket";

export const Support = {
  getList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/admin/list`, pagination);
  },

  reply(data: Record<string, unknown>): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/admin/reply`, data);
  },

  editReply(data: Record<string, unknown>): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/admin/edit`, data);
  },

  changeStatus(data: { code: string; status: number }): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/admin/changeTicketStatus`, data);
  },
};
