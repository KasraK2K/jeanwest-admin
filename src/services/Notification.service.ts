import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

export default {
  /**
   * @param {*} data: { phoneNumber: string }
   */
  async getList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    return await apiClient("/notification/list", {
      method: "POST",
      data: filter,
    });
  },

  async login(data: {
    phoneNumber: string;
    pin: string;
  }): Promise<AxiosResponse> {
    return await apiClient("/customerAuth", {
      method: "POST",
      data,
    });
  },
};
