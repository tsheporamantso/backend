"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const async_1 = require("../middleware/async");
const http_status_codes_1 = require("http-status-codes");
const Auth_1 = __importDefault(require("../models/Auth"));
const custom_error_1 = require("../errors/custom-error");
exports.login = (0, async_1.asyncWrapper)(async (req, res) => {
    const auth = await Auth_1.default.create(req.body);
    if (!auth) {
        throw new custom_error_1.CustomAPIError("Please provide username and password", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        msg: "Login successful",
    });
});
exports.dashboard = (0, async_1.asyncWrapper)(async (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        msg: "Dashboard",
    });
});
