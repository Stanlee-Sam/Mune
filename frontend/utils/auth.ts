// utils/auth.ts
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/auth";

export const getUserFromToken = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};
