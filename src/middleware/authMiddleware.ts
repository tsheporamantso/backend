import jwt from "jsonwebtoken";
import { getEnvVariable } from "../utils/env";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/unauthenticated";

export interface JWTPayloadType {
  userId: string;
  username: string;
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      getEnvVariable("JWT_SECRET"),
    ) as JWTPayloadType;
    req.user = { userId: payload.userId, name: payload.username };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication invalid");
  }
};
