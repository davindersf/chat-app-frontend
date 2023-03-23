import jwtDecode from "jwt-decode";
import { User } from "../types/user.types";
import { getAccessToken } from "./session-storage";

export function getUser() {
  const token = getAccessToken();
  if (!token) {
    return;
  }

  const user = jwtDecode(token);
  return user as User;
}
