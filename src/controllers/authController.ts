import "dotenv/config";
import User from "../models/User";
import { Request, Response } from "express";
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

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: { name: user.username },
    token,
  });
});
