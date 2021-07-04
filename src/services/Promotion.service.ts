import { IPagination } from "./../interfaces/others/pagination.interface";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/promotion";

export default {
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: J E A N S P O I N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  /**
   * @param { Record<string, unknown> } filter
   */
  async getPointList(filter: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/point/list`, filter);
  },

  async findOnePoint(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/point/${id}`);
  },

  async editPoint(data: Record<string, unknown>): Promise<AxiosResponse<any>> {
    return await apiClient.patch(`${modulePath}/point`, data);
  },

  // ────────────────────────────────────────────────────────────
  //   :::::: G R O U P : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  /**
   * @param { Record<string, unknown> } filter
   */
  async getGroupList(filter: IPagination): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/group/list`, filter);
  },

  async editGroup(data: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.patch(`${modulePath}/group`, data);
  },

  async groupSoftDelete(id: string): Promise<AxiosResponse> {
    return await apiClient.delete(`${modulePath}/group/${id}`);
  },
};
