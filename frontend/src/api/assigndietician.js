import { axiosInstance } from "./axios.api";

export const assignDietician = async (data) => {
  const response = await axiosInstance.post("/assign-dietician", data);
  return response.data;
};

export const getAssignedDieticians = async () => {
  const response = await axiosInstance.get("/assign-dietician");
  return response.data;
};

export const updateAssignedDietician = async (id, data) => {
  const response = await axiosInstance.put(`/assign-dietician/${id}`, data);
  return response.data;
};

export const deleteAssignedDietician = async (id) => {
  const response = await axiosInstance.delete(`/assign-dietician/${id}`);
  return response.data;
};
