"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = void 0;
exports.createCustomError = createCustomError;
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomAPIError = CustomAPIError;
function createCustomError(msg, statusCode) {
    return new CustomAPIError(msg, statusCode);
}
