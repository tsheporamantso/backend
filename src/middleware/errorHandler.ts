import { ErrorRequestHandler } from "express";
import { CustomAPIError } from "../errors/custom-error";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err instanceof CustomAPIError) {
    console.log(err.message);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({
    msg: "Something went wrong, please try again",
  });
};
