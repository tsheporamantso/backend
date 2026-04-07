import { asyncWrapper } from "../middleware/async";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import authentication from "../models/Auth";
import { CustomAPIError } from "../errors/custom-error";

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const auth = await authentication.create(req.body);

  if (!auth) {
    throw new CustomAPIError(
      "Please provide username and password",
      StatusCodes.BAD_REQUEST,
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Login successful",
  });
});

export const dashboard = asyncWrapper(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Dashboard",
  });
});
