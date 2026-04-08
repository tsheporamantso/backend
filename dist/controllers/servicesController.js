"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getSingleService = exports.createService = exports.getServices = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const async_1 = require("../middleware/async");
const custom_error_1 = require("../errors/custom-error");
const http_status_codes_1 = require("http-status-codes");
exports.getServices = (0, async_1.asyncWrapper)(async (req, res) => {
    const services = await Service_1.default.find({});
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ nbHits: services.length, success: true, services });
});
exports.createService = (0, async_1.asyncWrapper)(async (req, res) => {
    const service = await Service_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, service });
});
exports.getSingleService = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: serviceID } = req.params;
    const service = await Service_1.default.findOne({ _id: serviceID });
    if (!service) {
        return next((0, custom_error_1.createCustomError)(`No service with id: ${serviceID}`, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        service,
    });
});
exports.updateService = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: serviceID } = req.params;
    const service = await Service_1.default.findOneAndUpdate({ _id: serviceID }, req.body, {
        returnDocument: "after",
        runValidators: true,
    });
    if (!service) {
        return next((0, custom_error_1.createCustomError)(`No service with id: ${serviceID}`, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        service,
    });
});
exports.deleteService = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: serviceID } = req.params;
    const service = await Service_1.default.findOneAndDelete({ _id: serviceID });
    if (!service) {
        return next((0, custom_error_1.createCustomError)(`No service with id: ${serviceID}`, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        msg: "project deleted successfully",
        data: null,
    });
});
