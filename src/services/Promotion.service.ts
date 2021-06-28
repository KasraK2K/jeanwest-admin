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
  async getPointList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/point/list`, filter);
  },

  async findOnePoint(id: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/point/${id}`);
  },

  // ────────────────────────────────────────────────────────────
  //   :::::: G R O U P : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  /**
   * @param { Record<string, unknown> } filter
   */
  async getGroupList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/group/list`, filter);
  },

  async groupSoftDelete(id: string): Promise<AxiosResponse> {
    return await apiClient.delete(`${modulePath}/group/${id}`);
  },
};
