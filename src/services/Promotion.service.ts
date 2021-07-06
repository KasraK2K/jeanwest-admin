import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/promotion";

export default {
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: J E A N S P O I N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  /**
   * @param { Record<string, unknown> } pagination
   */
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

  async createDiscount(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/discount/admin/create`, data);
  },

  /**
   * @param { Record<string, unknown> } pagination
   */
  async getDiscountList(pagination: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(
      `${modulePath}/discount/admin/list`,
      pagination
    );
  },

  async findOneDiscount(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/discount/admin/${id}`);
  },

  async editDiscount(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.patch(`${modulePath}/discount/admin/edit`, data);
  },

  async discountSoftDelete(id: string): Promise<AxiosResponse> {
    return await apiClient.delete(`${modulePath}/discount/admin/delete/${id}`);
  },

  // ────────────────────────────────────────────────────────────
  //   :::::: G R O U P : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  /**
   * @param { Record<string, unknown> } pagination
   */
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
