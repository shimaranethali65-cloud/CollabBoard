import { apiRequest } from "./api";
import type { User } from "../types";

export interface AuthResponse {
  token: string;
  user: User;
}

export const registerUser = (payload: {
  name?: string;
  username: string;
  email?: string;
  password: string;
}) =>
  apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const loginUser = (payload: {
  username?: string;
  email?: string;
  password: string;
}) =>
  apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const loginAdmin = (payload: {
  username?: string;
  email?: string;
  password: string;
}) =>
  apiRequest<AuthResponse>("/auth/admin-login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const getCurrentUser = () => apiRequest<User>("/auth/me");
