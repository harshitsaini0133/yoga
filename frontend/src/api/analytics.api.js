import { axiosInstance } from "./axios.api";

export const getAnalytics = async () => {
  const response = await axiosInstance.get("/analytics");
  return response.data;
};
