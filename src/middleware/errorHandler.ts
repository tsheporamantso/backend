import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(500).json({
    msg: "Something went wrong, please try again",
  });
}
