import { CustomAPIError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string, statusCode: number = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}
