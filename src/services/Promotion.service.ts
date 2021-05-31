import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/promotion";

export default {
  /**
   * @param { Record<string, unknown> } filter
   */
  async getPointList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient(`${modulePath}/point/list`, {
      method: "POST",
      data: filter,
    });
  },

  /**
   * @param { Record<string, unknown> } filter
   */
  async getGroupList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient(`${modulePath}/group/list`, {
      method: "POST",
      data: filter,
    });
  },
};
