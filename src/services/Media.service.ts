import { globals } from "@/common/globals/globals";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

export default {
  async upload(path: string, file: string | Blob): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("image", file);
    return await apiClient.post(`${globals.mediaServerBaseURL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
