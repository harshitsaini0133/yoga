import { axiosInstance } from "./axios.api";

export const getMe = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users/all");
  return response.data;
};
