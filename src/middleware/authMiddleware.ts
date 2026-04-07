import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/unauthenticated";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { getEnvVariable } from "../utils/env";
import { AuthRequest } from "../types/auth";

export interface JWTPayloadType {
  id: number;
  username: string;
}

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid credentials to access this route");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      getEnvVariable("JWT_SECRET"),
    ) as JWTPayloadType;
    const { id, username } = decoded;
    const authReq = req as AuthRequest;
    authReq.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};
