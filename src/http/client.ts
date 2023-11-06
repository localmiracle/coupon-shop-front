import axios from "axios";

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api`;

const apiClient = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

export default apiClient;
