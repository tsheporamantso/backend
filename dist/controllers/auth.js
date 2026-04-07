"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const async_1 = require("../middleware/async");
const http_status_codes_1 = require("http-status-codes");
exports.login = (0, async_1.asyncWrapper)(async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
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
