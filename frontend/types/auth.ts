// types/auth.ts
export type JwtPayload = {
  userId: string;
  role: "USER" | "VET" | "ADMIN";
  exp: number;
};
