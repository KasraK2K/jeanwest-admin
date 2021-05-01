import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

export default {
  /**
   * @param {*} data: { phoneNumber: string }
   */
  async getPin(data: { phoneNumber: string }): Promise<AxiosResponse> {
    return await apiClient("/otp/request", {
      method: "POST",
      data,
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
