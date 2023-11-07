import axios from "axios";
import { tokenIsValid } from "./utils";

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api`;

const apiClient = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (tokenIsValid(token)) {
    if (config.url?.includes("coupons/standard")) {
      config.headers.Authorization = `Bearer ${token}`;
      config.url = config.url.replace("/standard", "");
    }
    if (config.url?.includes("subscriptions")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    localStorage.removeItem("token");
    config.headers.Authorization = null;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
