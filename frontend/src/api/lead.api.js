import { axiosInstance } from "./axios.api";

export const getLeads = async () => {
  const response = await axiosInstance.get("/leads");
  return response.data;
};

export const createLead = async (data) => {
  const response = await axiosInstance.post("/leads", data);
  return response.data;
};

export const updateLead = async (id, data) => {
  const response = await axiosInstance.put(`/leads/${id}`, data);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await axiosInstance.delete(`/leads/${id}`);
  return response.data;
};
