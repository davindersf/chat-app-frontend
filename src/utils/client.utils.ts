import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../constants/env-vars.constants";
import { refreshAccessToken } from "../queries/auth.queries";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "./session-storage";

function manuallySignOut() {
  removeAccessToken();
  removeRefreshToken();
  window.location.href = "/login";
}

const controller = new AbortController();

export const client = axios.create({
  baseURL: API_BASE_URL,
  signal: controller.signal,
});

client.interceptors.request.use(function (config) {
  const accessToken = getAccessToken();
  if (accessToken) {
    Object.assign(config.headers, { Authorization: `Bearer ${accessToken}` });
  }
  return config;
});

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error instanceof AxiosError) {
      // logout user if response contains unauthorized user error
      if (error.response?.status === 401) {
        try {
          const { accessToken } = await refreshAccessToken();
          setAccessToken(accessToken);
        } catch (error) {
          manuallySignOut();
        }
      }
    }
    return Promise.reject(error);
  }
);
