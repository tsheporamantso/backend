import { CustomAPIError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends CustomAPIError {
  constructor(message: string, statusCode: number = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}
