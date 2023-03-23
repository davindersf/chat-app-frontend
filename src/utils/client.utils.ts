import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../constants/env-vars.constants";
import { getAccessToken } from "./session-storage";

const controller = new AbortController();

export const client = axios.create({
  baseURL: API_BASE_URL,
  signal: controller.signal,
});

// TODO - implement refresh token strategy

client.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    Object.assign(config.headers, { Authorization: `Bearer ${accessToken}` });
  }
  return config;
});
