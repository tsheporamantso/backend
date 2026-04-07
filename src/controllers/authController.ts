require("dotenv").config();
import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { CustomAPIError } from "../errors/custom-error";
import { getEnvVariable } from "../utils/env";
import { AuthRequest } from "../types/auth";

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError(
      "Please provide username and password",
      StatusCodes.BAD_REQUEST,
    );
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
