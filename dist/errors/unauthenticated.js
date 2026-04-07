"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const custom_error_1 = require("./custom-error");
const http_status_codes_1 = require("http-status-codes");
class UnauthenticatedError extends custom_error_1.CustomAPIError {
    constructor(message, statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
