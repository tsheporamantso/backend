"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const async_1 = require("../middleware/async");
const custom_error_1 = require("../errors/custom-error");
const http_status_codes_1 = require("http-status-codes");
const getAllReviewers = (0, async_1.asyncWrapper)(async (req, res) => {
    const testimonial = await Testimonial_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        testimonial,
        nbHits: testimonial.length,
    });
});
const createReviewer = (0, async_1.asyncWrapper)(async (req, res) => {
    const testimonial = await Testimonial_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        testimonial,
    });
});
const getSingleReviewer = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial_1.default.findOne({ _id: reviewerID });
    if (!testimonial) {
        return next((0, custom_error_1.createCustomError)(`No testimonial with id: ${reviewerID}`, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        testimonial,
    });
});
const updateReviewer = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial_1.default.findOneAndUpdate({ _id: reviewerID }, req.body, {
        runValidators: true,
        returnDocument: "after",
    });
    if (!testimonial) {
        return next((0, custom_error_1.createCustomError)(`No testimonial with id: ${reviewerID}`, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        testimonial,
    });
});
const deleteReviewer = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial_1.default.findOneAndDelete({ _id: reviewerID });
    if (!testimonial) {
        return next((0, custom_error_1.createCustomError)(`No testimonial with id: ${reviewerID}`, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        msg: "Testimonial successfully deleted.",
        data: null,
    });
});
module.exports = {
    createReviewer,
    getAllReviewers,
    getSingleReviewer,
    updateReviewer,
    deleteReviewer,
};
