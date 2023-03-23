import axios from "axios";
import {
  AUTH_API_URL,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
} from "../constants/env-vars.constants";
import { AccessTokenResponse } from "../types/auth.types";
import { client } from "../utils/client.utils";
import { getKeys } from "../utils/object.utils";
import { getRefreshToken, setAccessToken } from "../utils/session-storage";

export async function googleOAuthLogin() {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `${AUTH_API_URL}/auth/google`;
  form.style.display = "none";
  form.append("Content-Type", "application/x-www-form-urlencoded");
  const body = {
    client_id: AUTH_CLIENT_ID,
    client_secret: AUTH_CLIENT_SECRET,
  };
  getKeys(body).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = body[key];
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

export async function getAccessTokenFromCode(code: string) {
  const { data } = await axios.post<AccessTokenResponse>(
    `${AUTH_API_URL}/auth/token`,
    {
      code,
      clientId: AUTH_CLIENT_ID,
    }
  );
  return data;
}

export async function loginByCredentials(username: string, password: string) {
  const { data } = await axios.post<{ code: string }>(
    `${AUTH_API_URL}/auth/login`,
    {
      client_secret: AUTH_CLIENT_SECRET,
      client_id: AUTH_CLIENT_ID,
      username,
      password,
    }
  );
  return data;
}

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  const { data } = await client.post<AccessTokenResponse>(
    `${AUTH_API_URL}/auth/token-refresh`,
    { refreshToken }
  );
  setAccessToken(data.accessToken);
  setAccessToken(data.refreshToken);
  return data;
}
