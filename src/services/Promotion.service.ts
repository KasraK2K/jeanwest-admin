import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";
import { IDiscount } from "@/interfaces/entities/discount.interface";

const modulePath = "/promotion";

export default {
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: J E A N S P O I N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  async getPointList(pagination: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/point/list`, pagination);
  },

  async findOnePoint(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/point/${id}`);
  },

  async editPoint(data: Record<string, unknown>): Promise<AxiosResponse<any>> {
    return await apiClient.patch(`${modulePath}/point`, data);
  },

  // ──────────────────────────────────────────────────────────────────
  //   :::::: D I S C O U N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  async createDiscount(data: IDiscount): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/discount/admin/create`, data);
  },

  async getDiscountList(pagination: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(
      `${modulePath}/discount/admin/list`,
      pagination
    );
  },

  async findOneDiscount(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/discount/admin/${id}`);
  },

  async editDiscount(data: IDiscount): Promise<AxiosResponse> {
    return await apiClient.patch(`${modulePath}/discount/admin/edit`, data);
  },

  async discountSoftDelete(id: string): Promise<AxiosResponse> {
    return await apiClient.delete(`${modulePath}/discount/admin/delete/${id}`);
  },

  // ────────────────────────────────────────────────────────────
  //   :::::: G R O U P : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  async getGroupList(pagination: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/group/list`, pagination);
  },

  async editGroup(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.patch(`${modulePath}/group`, data);
  },

  async groupSoftDelete(id: string): Promise<AxiosResponse> {
    return await apiClient.delete(`${modulePath}/group/${id}`);
  },
};
