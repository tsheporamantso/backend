"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Project_1 = __importDefault(require("../models/Project"));
const connect_1 = __importDefault(require("../db/connect"));
const env_1 = require("../utils/env");
const data_1 = require("../utils/data");
const start = async () => {
    try {
        await (0, connect_1.default)((0, env_1.getEnvVariable)("MONGO_URI"));
        await Project_1.default.deleteMany();
        await Project_1.default.create(data_1.data);
        console.log("SUCCESS");
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
