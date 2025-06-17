import { config } from "../config/env";

export const userRoleEnum = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const availableUserRoles = Object.values(userRoleEnum);

export const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
} as const;
