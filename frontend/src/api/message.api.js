import { axiosInstance } from "./axios.api";
export const sendMessage = async (data) => {
  const response = await axiosInstance.post("/messages", data);
  return response.data;
};

export const getMessages = async () => {
  const response = await axiosInstance.get("/messages");
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axiosInstance.delete(`/messages/${id}`);
  return response.data;
};

export const updateMessage = async (id, data) => {
  const response = await axiosInstance.put(`/messages/${id}`, data);
  return response.data;
};

export const getAllMessages = async () => {
  const response = await axiosInstance.get("/messages/all");
  return response.data;
};
