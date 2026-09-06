import { AppError } from "./AppError";

export const PROJECT_STATUSES = [
  "TODO",
  "DOING",
  "IN_PROGRESS",
  "SUBMITTED",
  "DONE",
  "COMPLETED",
  "CLOSED",
  "PLANNING"
] as const;
export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;
export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const assertValidEmail = (email: string) => {
  if (!email || !EMAIL_REGEX.test(email.trim())) {
    throw new AppError("Please provide a valid email address", 400);
  }
};

const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,30}$/;

export const assertValidUsername = (username: string) => {
  if (!username || !USERNAME_REGEX.test(username.trim())) {
    throw new AppError(
      "Username must be between 3 and 30 characters and contain only letters, numbers, hyphens, dots, or underscores",
      400
    );
  }
};

export const assertValidPassword = (password: string) => {
  if (!password || password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }
};

export const assertNonEmpty = (value: unknown, field: string) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new AppError(`${field} is required`, 400);
  }
};

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const assertObjectId = (id: unknown, field = "id"): string => {
  if (
    typeof id !== "string" ||
    (!OBJECT_ID_REGEX.test(id.trim()) && !UUID_REGEX.test(id.trim()))
  ) {
    throw new AppError(`Invalid ${field}`, 400);
  }
  return id.trim();
};

export const isUUID = (value: unknown): boolean =>
  typeof value === "string" && (OBJECT_ID_REGEX.test(value.trim()) || UUID_REGEX.test(value.trim()));

export const parseEnum = <T extends readonly string[]>(
  value: unknown,
  allowed: T,
  field: string
): T[number] => {
  if (typeof value === "string") {
    const raw = value.trim();
    if (allowed.includes(raw as any)) {
      return raw as T[number];
    }
    const upper = raw.toUpperCase().replace(/\s+/g, "_");
    if (allowed.includes(upper as any)) {
      return upper as T[number];
    }
    // Mapping common friendly labels and aliases
    if (field.toLowerCase().includes("status")) {
      if (upper === "TO_DO" || upper === "TODO" || upper === "PLANNING") {
        if (allowed.includes("TODO" as any)) return "TODO" as T[number];
        if (allowed.includes("PLANNING" as any)) return "PLANNING" as T[number];
      }
      if (upper === "IN_PROGRESS" || upper === "INPROGRESS" || upper === "DOING") {
        if (allowed.includes("DOING" as any)) return "DOING" as T[number];
        if (allowed.includes("IN_PROGRESS" as any)) return "IN_PROGRESS" as T[number];
      }
      if (upper === "SUBMITTED" || upper === "PENDING" || upper === "REVIEW") {
        if (allowed.includes("SUBMITTED" as any)) return "SUBMITTED" as T[number];
      }
      if (upper === "DONE" || upper === "COMPLETED") {
        if (allowed.includes("DONE" as any)) return "DONE" as T[number];
        if (allowed.includes("COMPLETED" as any)) return "COMPLETED" as T[number];
      }
      if (upper === "CLOSED") {
        if (allowed.includes("CLOSED" as any)) return "CLOSED" as T[number];
      }
    }
    if (field.toLowerCase().includes("priority")) {
      if (upper === "HIGH" && allowed.includes("HIGH" as any)) return "HIGH" as T[number];
      if (upper === "MEDIUM" && allowed.includes("MEDIUM" as any)) return "MEDIUM" as T[number];
      if (upper === "LOW" && allowed.includes("LOW" as any)) return "LOW" as T[number];
    }
  }

  throw new AppError(
    `Invalid ${field}. Allowed values: ${allowed.join(", ")}`,
    400
  );
};

export const parseOptionalDate = (value: unknown, field = "dueDate") => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new AppError(`Invalid ${field}`, 400);
  }
  return date;
};

export const normalizeStringArray = (value: unknown): string[] => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};
