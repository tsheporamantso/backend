"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const custom_error_1 = require("./custom-error");
class UnauthenticatedError extends custom_error_1.CustomAPIError {
    constructor(message, statusCode = 401) {
        super(message, statusCode);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
