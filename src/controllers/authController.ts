import "dotenv/config";
import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { BadRequest } from "../errors/bad-request";
import { getEnvVariable } from "../utils/env";
import { AuthRequest } from "../types/auth";
import User from "../models/User";

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: { name: user.username },
    token,
  });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide username and password");
  }

  const id = new Date().getDate();

  const options: SignOptions = {
    expiresIn: getEnvVariable("JWT_EXPIRES_IN") as SignOptions["expiresIn"],
  };

  const token = jwt.sign(
    { id, username },
    getEnvVariable("JWT_SECRET"),
    options,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "User created",
    token,
  });
});

export const dashboard = asyncWrapper(async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Welcome ${authReq.user?.username}`,
  });
});
