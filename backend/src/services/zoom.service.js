import { getZoomAccessToken } from "../utils/zoomToken.js";
import axios from "axios";

export const createMeeting = async ({ topic, startTime, duration }) => {
  try {
    const token = await getZoomAccessToken();

    const isoStartTime = new Date(startTime).toISOString();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2,
        start_time: isoStartTime,
        duration: Number(duration),
        timezone: "Asia/Kolkata",
        settings: {
          auto_recording: "cloud",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("ZOOM MEETING ERROR:", error);
    throw error;
  }
};
export const getMeeting = async (meetingId) => {
  const token = await getZoomAccessToken();

  const response = await axios.get(
    `https://api.zoom.us/v2/meetings/${meetingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const deleteMeeting = async (meetingId) => {
  const token = await getZoomAccessToken();

  const response = await axios.delete(
    `https://api.zoom.us/v2/meetings/${meetingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const updateMeeting = async (meetingId, data) => {
  const token = await getZoomAccessToken();

  const response = await axios.patch(
    `https://api.zoom.us/v2/meetings/${meetingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getRecording = async (meetingId) => {
  const token = await getZoomAccessToken();

  const response = await axios.get(
    `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
