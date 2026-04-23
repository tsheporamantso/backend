import "dotenv/config";
import User from "../models/User";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { BadRequest } from "../errors/bad-request";
import { attachCookiesToResponse } from "../utils/cookies";
import { UnauthenticatedError } from "../errors/unauthenticated";

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ ...req.body, role });
  const token = user.createJWT();

  attachCookiesToResponse(res, token);

  res.status(StatusCodes.CREATED).json({
    user: { userId: user._id, name: user.username, role: user.role },
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

  attachCookiesToResponse(res, token);

  res.status(StatusCodes.OK).json({
    user: { userId: user._id, name: user.username, role: user.role },
  });
});

export const logout = asyncWrapper(async (req, res) => {
  res.cookie("token", "token", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
});
