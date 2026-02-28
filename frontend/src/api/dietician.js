import { axiosInstance } from "./axios.api";

export const getAllDieticians = async () => {
  const response = await axiosInstance.get("/dieticians");
  return response.data;
};

export const getMyAssignedUsers = async () => {
  const response = await axiosInstance.get("/my/assigned-users");
  return response.data;
};

export const createDietician = async (data) => {
  const response = await axiosInstance.post("/dieticians", data);
  return response.data;
};

export const updateDietician = async (id, data) => {
  const response = await axiosInstance.put(`/dieticians/${id}`, data);
  return response.data;
};

export const deleteDietician = async (id) => {
  const response = await axiosInstance.delete(`/dieticians/${id}`);
  return response.data;
};
