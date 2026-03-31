"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../middleware/async");
const Service_1 = __importDefault(require("../models/Service"));
const getServices = (0, async_1.asyncWrapper)(async (req, res) => {
    res.status(200).json({ msg: "get all services" });
});
const createService = (0, async_1.asyncWrapper)(async (req, res) => {
    const service = await Service_1.default.create(req.body);
    res.status(200).json({ success: true, service });
});
module.exports = {
    getServices,
    createService,
};
