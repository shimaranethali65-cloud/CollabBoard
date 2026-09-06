import { apiRequest } from "./api";
import type { DashboardStats } from "../types";

export const getDashboardStats = () =>
  apiRequest<DashboardStats>("/dashboard/stats");
