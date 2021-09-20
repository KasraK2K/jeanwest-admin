import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

export const Auth = {
  /**
   * @param {*} data: { phoneNumber: string }
   */
  getPin(data: { phoneNumber: string }): Promise<AxiosResponse> {
    return apiClient.post("/otp/request/admin", data);
  },

  login(data: { phoneNumber: string; pin: string }): Promise<AxiosResponse> {
    return apiClient.post("/adminAuth", data);
  },
};
