"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
const http_status_codes_1 = require("http-status-codes");
function notFound(req, res) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        msg: "Route not found",
    });
}
