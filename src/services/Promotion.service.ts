import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

const modulePath = "/promotion";

export default {
  /**
   * @param { Record<string, unknown> } filter
   */
  async getPointList(filter: Record<string, unknown>): Promise<AxiosResponse> {
    console.log("filter", filter);
    return await apiClient(`${modulePath}/point/list`, {
      method: "POST",
      data: filter,
    });
  },
};
