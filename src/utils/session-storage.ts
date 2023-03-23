import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/keys.constants";

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN)
}

export function setAccessToken(token: string) {
  return sessionStorage.setItem(ACCESS_TOKEN, token)
}

export function removeAccessToken() {
  return sessionStorage.removeItem(ACCESS_TOKEN)
}

export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_TOKEN)
}

export function setRefreshToken(token: string) {
  return sessionStorage.setItem(REFRESH_TOKEN, token)
}

export function removeRefreshToken() {
  return sessionStorage.removeItem(REFRESH_TOKEN)
}


