import { axiosInstance } from "./axios.api";

export const createZoomMeeting = async (data) => {
  console.log(data);
  const response = await axiosInstance.post("/meetings", data);
  return response.data;
};

export const getAllZoomMeetings = async () => {
  const response = await axiosInstance.get("/meetings");
  return response.data;
};

export const getMyZoomMeetings = async () => {
  const response = await axiosInstance.get("/my/meetings");
  return response.data;
};
