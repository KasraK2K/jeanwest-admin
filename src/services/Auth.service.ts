import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

export default {
  /**
   * @param {*} data: { phoneNumber: string }
   */
  async getPin(data: { phoneNumber: string }): Promise<AxiosResponse> {
    return await apiClient.post("/otp/request", data);
  },

  async login(data: {
    phoneNumber: string;
    pin: string;
  }): Promise<AxiosResponse> {
    return await apiClient.post("/customerAuth", data);
  },
};
