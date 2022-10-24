import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import {LocalStorageKeys} from "../enums/storages";


export const API_URL = "http://localhost:5000/api";


export const getRefreshedTokens = async () => {
  return await axios.get<AuthResponse>(`${API_URL}/refresh`, {
    withCredentials: true,
  });
};

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await getRefreshedTokens();
        localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Не авторизован");
      }
    }
    throw error;
  }
);

export default $api;
