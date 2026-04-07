require("dotenv").config();
import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { CustomAPIError } from "../errors/custom-error";
import { getEnvVariable } from "../utils/env";

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
  interface JWTPayloadTypes {
    id: number;
    username: string;
  }
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError(
      "Invalid credentials to access this route",
      StatusCodes.UNAUTHORIZED,
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      getEnvVariable("JWT_SECRET"),
    ) as JWTPayloadTypes;
    res.status(StatusCodes.OK).json({
      success: true,
      msg: `Welcome ${decoded.username}`,
    });
  } catch (error) {
    throw new CustomAPIError(
      "Not authorized to access this route",
      StatusCodes.UNAUTHORIZED,
    );
  }
});
