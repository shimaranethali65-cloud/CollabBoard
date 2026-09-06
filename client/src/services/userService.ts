import { apiRequest } from "./api";
import type { User } from "../types";

export const searchUsers = (q: string) =>
  apiRequest<User[]>(`/users/search?q=${encodeURIComponent(q)}`);

export const updateProfile = (payload: {
  name?: string;
  username?: string;
  email?: string;
  profileImage?: string;
}) =>
  apiRequest<User>("/users/me", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
