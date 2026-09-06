import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export const toSafeUser = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role || "USER",
  profileImage: user.profileImage || "",
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const signToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { userId: String(user._id), email: user.email, role: user.role || "USER" },
    secret,
    { expiresIn: "7d" }
  );
};
