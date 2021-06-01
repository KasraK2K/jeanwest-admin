import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/promotion";

export default {
  /* -------------------------------------------------------------------------- */
  /*                                 JeansPoint                                 */
  /* -------------------------------------------------------------------------- */
  /**
   * @param { Record<string, unknown> } filter
   */
  async getPointList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/point/list`, filter);
  },

  async findOnePoint(code: string): Promise<AxiosResponse> {
    return await apiClient.get(`${modulePath}/point/find?code=${code}`);
  },

  /* -------------------------------------------------------------------------- */
  /*                                    Group                                   */
  /* -------------------------------------------------------------------------- */
  /**
   * @param { Record<string, unknown> } filter
   */
  async getGroupList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient.post(`${modulePath}/group/list`, filter);
  },
};
