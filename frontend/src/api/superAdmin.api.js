import { axiosInstance } from "./axios.api";

export const createAdmin = async (data) => {
  const response = await axiosInstance.post("/super-admin/create-admin", data);
  return response.data;
};

export const getAllAdmins = async () => {
  const response = await axiosInstance.get("/super-admin/admins");
  return response.data;
};
