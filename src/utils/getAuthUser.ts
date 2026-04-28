import { Request } from "express";
import CustomError from "../errors";

export type AuthUser = NonNullable<Request["user"]>;

export const getAuthUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw new CustomError.UnauthenticatedError("Authentication required");
  }
  return req.user;
};
