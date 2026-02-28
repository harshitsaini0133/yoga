import { axiosInstance } from "./axios.api";

export const createSubscription = async (data) => {
  const response = await axiosInstance.post("/subscriptions", data);
  return response.data;
};

export const getSubscriptions = async () => {
  const response = await axiosInstance.get("/subscriptions");
  return response.data;
};

export const deleteSubscription = async (id) => {
  const response = await axiosInstance.delete(`/subscriptions/${id}`);
  return response.data;
};

export const updateSubscription = async (id, data) => {
  const response = await axiosInstance.put(`/subscriptions/${id}`, data);
  return response.data;
};
