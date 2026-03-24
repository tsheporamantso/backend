"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVariable = getEnvVariable;
function getEnvVariable(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}
