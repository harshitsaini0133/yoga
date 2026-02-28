import { axiosInstance } from "./axios.api";

export const login = async (email, password) => {
  const response = await axiosInstance.post("/auth/admin/login", {
    email,
    password,
  });
  return response.data;
};
