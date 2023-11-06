import axios from "axios";

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT_ADMIN}/admin`;

const $adminApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$adminApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("adminToken")}`;
  return config;
});

$adminApi.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) location.reload();
    return Promise.reject(error);
  }
);

export default $adminApi;
