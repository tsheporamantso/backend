"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = errorHandlerMiddleware;
function errorHandlerMiddleware(err, req, res, next) {
    return res.status(500).json({
        msg: "Something went wrong, please try again",
    });
}
