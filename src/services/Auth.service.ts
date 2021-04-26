import { apiClient } from "./Axios.service";

export default {
  /**
   * @param {*} data: { phoneNumber: string }
   */
  async getPin(data: any) {
    return await apiClient("/otp/request", {
      method: "POST",
      data,
    });
  },

  async login(data: any) {
    return await apiClient("/customerAuth", {
      method: "POST",
      data,
    });
  },
};
