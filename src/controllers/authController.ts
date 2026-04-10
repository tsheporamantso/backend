import "dotenv/config";
import User from "../models/User";
import { Request, Response } from "express";
import { AuthRequest } from "../types/auth";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { BadRequest } from "../errors/bad-request";
import { UnauthenticatedError } from "../errors/unauthenticated";

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: { name: user.username },
    token,
  });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: { name: user.username },
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
