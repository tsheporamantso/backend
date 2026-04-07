"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const custom_error_1 = require("../errors/custom-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../utils/env");
const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new custom_error_1.CustomAPIError("Invalid credentials to access this route", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, (0, env_1.getEnvVariable)("JWT_SECRET"));
        const { id, username } = decoded;
        const authReq = req;
        authReq.user = { id, username };
        next();
    }
    catch (error) {
        throw new custom_error_1.CustomAPIError("Not authorized to access this route", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
