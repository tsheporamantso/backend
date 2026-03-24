"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./utils/env");
const connect_1 = __importDefault(require("./db/connect"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
async function start() {
    try {
        await (0, connect_1.default)((0, env_1.getEnvVariable)("MONGO_URI"));
        console.log("CONNECTED TO DB...");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
