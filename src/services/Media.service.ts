import { globals } from "@/common/globals/globals";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";

export const Media = {
  upload(path: string, file: any): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("image", file);
    return apiClient.post(`${globals.mediaServerBaseURL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
