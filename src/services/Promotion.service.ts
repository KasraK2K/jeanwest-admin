import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";
import { IDiscount } from "@/interfaces/entities/discount.interface";

const modulePath = "/promotion";

export const Promotion = {
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: J E A N S P O I N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  getPointList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/point/list`, pagination);
  },

  findOnePoint(id: string): Promise<AxiosResponse> {
    return apiClient.get(`${modulePath}/point/${id}`);
  },

  editPoint(data: Record<string, unknown>): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/point`, data);
  },

  // ──────────────────────────────────────────────────────────────────
  //   :::::: D I S C O U N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  createDiscount(data: IDiscount): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/discount/admin/create`, data);
  },

  getDiscountList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/discount/admin/list`, pagination);
  },

  findOneDiscount(id: string): Promise<AxiosResponse> {
    return apiClient.get(`${modulePath}/discount/admin/${id}`);
  },

  editDiscount(data: IDiscount): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/discount/admin/edit`, data);
  },

  discountSoftDelete(id: string): Promise<AxiosResponse> {
    return apiClient.delete(`${modulePath}/discount/admin/delete/${id}`);
  },

  // ────────────────────────────────────────────────────────────
  //   :::::: G R O U P : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  getGroupList(pagination: IPagination): Promise<AxiosResponse> {
    return apiClient.post(`${modulePath}/group/list`, pagination);
  },

  editGroup(data: Record<string, unknown>): Promise<AxiosResponse> {
    return apiClient.patch(`${modulePath}/group`, data);
  },

  groupSoftDelete(id: string): Promise<AxiosResponse> {
    return apiClient.delete(`${modulePath}/group/${id}`);
  },
};
