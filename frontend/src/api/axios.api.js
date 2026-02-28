import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://yoga-xnra.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
