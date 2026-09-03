import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const dashboard = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    msg: `Welcome ${req.user?.name}`,
  });
};
