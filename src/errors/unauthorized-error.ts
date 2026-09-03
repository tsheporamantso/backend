import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-error";

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string, statusCode: number = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}
