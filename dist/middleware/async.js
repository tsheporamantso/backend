"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = asyncWrapper;
function asyncWrapper(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
