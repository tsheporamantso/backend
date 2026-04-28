import { CustomAPIError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends CustomAPIError {
  constructor(message: string, statusCode: number = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}
