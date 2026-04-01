"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const async_1 = require("../middleware/async");
const custom_error_1 = require("../errors/custom-error");
const getAllReviewers = (0, async_1.asyncWrapper)(async (req, res) => {
    const testimonial = await Testimonial_1.default.find({});
    res.status(200).json({
        success: true,
        testimonial,
        nbHits: testimonial.length,
    });
});
const createReviewer = (0, async_1.asyncWrapper)(async (req, res) => {
    const testimonial = await Testimonial_1.default.create(req.body);
    res.status(201).json({
        success: true,
        testimonial,
    });
});
const getSingleReviewer = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial_1.default.findOne({ _id: reviewerID });
    if (!testimonial) {
        return next((0, custom_error_1.createCustomError)(`No testimonial wit id: ${reviewerID}`, 404));
    }
    res.status(200).json({
        success: true,
        testimonial,
    });
});
const updateReviewer = (0, async_1.asyncWrapper)(async (req, res) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial_1.default.findOneAndUpdate({ _id: reviewerID }, req.body, {
        runValidators: true,
        returnDocument: "after",
    });
    res.status(200).json({
        success: true,
        testimonial,
    });
});
module.exports = {
    createReviewer,
    getAllReviewers,
    getSingleReviewer,
    updateReviewer,
};
