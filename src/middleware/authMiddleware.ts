import jwt from "jsonwebtoken";
import { getEnvVariable } from "../utils/env";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/unauthenticated";

export interface JWTPayloadType {
  userId: string;
  username: string;
  role: string;
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.signedCookies.token || req.cookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = jwt.verify(
      token,
      getEnvVariable("JWT_SECRET"),
    ) as JWTPayloadType;
    req.user = {
      userId: payload.userId,
      name: payload.username,
      role: payload.role,
    };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication invalid");
  }
};
