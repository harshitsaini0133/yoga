import { axiosInstance } from "./axios.api";

export const createDietPlan = async (data) => {
  const response = await axiosInstance.post("/dietplans", data);
  return response.data;
};

export const getDietPlans = async () => {
  const response = await axiosInstance.get("/dietplans");
  return response.data;
};

export const updateDietPlan = async (id, data) => {
  const response = await axiosInstance.put(`/dietplans/${id}`, data);
  return response.data;
};

export const deleteDietPlan = async (id) => {
  const response = await axiosInstance.delete(`/dietplans/${id}`);
  return response.data;
};
