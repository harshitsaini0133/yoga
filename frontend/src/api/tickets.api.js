import { axiosInstance } from "./axios.api";

export const createTicket = async (data) => {
  const response = await axiosInstance.post("/tickets", data);
  return response.data;
};

export const getTickets = async () => {
  const response = await axiosInstance.get("/tickets");
  return response.data;
};

export const updateTicket = async (id, data) => {
  const response = await axiosInstance.put(`/tickets/${id}`, data);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await axiosInstance.delete(`/tickets/${id}`);
  return response.data;
};
