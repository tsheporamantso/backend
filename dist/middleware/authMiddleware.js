"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const unauthenticated_1 = require("../errors/unauthenticated");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../utils/env");
const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new unauthenticated_1.UnauthenticatedError("Invalid credentials to access this route");
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
        throw new unauthenticated_1.UnauthenticatedError("Not authorized to access this route");
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
