"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const async_1 = require("../middleware/async");
const custom_error_1 = require("../errors/custom-error");
const env_1 = require("../utils/env");
exports.login = (0, async_1.asyncWrapper)(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new custom_error_1.CustomAPIError("Please provide username and password", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const id = new Date().getDate();
    const options = {
        expiresIn: (0, env_1.getEnvVariable)("JWT_EXPIRES_IN"),
    };
    const token = jsonwebtoken_1.default.sign({ id, username }, (0, env_1.getEnvVariable)("JWT_SECRET"), options);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        msg: "User created",
        token,
    });
});
exports.dashboard = (0, async_1.asyncWrapper)(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new custom_error_1.CustomAPIError("Invalid credentials to access this route", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, (0, env_1.getEnvVariable)("JWT_SECRET"));
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            msg: `Welcome ${decoded.username}`,
        });
    }
    catch (error) {
        throw new custom_error_1.CustomAPIError("Not authorized to access this route", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
});
