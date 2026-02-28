import { axiosInstance } from "./axios.api";

export const getOnboardingCalls = async () => {
  const response = await axiosInstance.get("/onboardingcalls");
  return response.data;
};

export const createOnboardingCall = async (data) => {
  const response = await axiosInstance.post("/onboardingcalls", data);
  return response.data;
};

export const updateOnboardingCall = async (id, data) => {
  const response = await axiosInstance.put(`/onboardingcalls/${id}`, data);
  return response.data;
};

export const deleteOnboardingCall = async (id) => {
  const response = await axiosInstance.delete(`/onboardingcalls/${id}`);
  return response.data;
};
