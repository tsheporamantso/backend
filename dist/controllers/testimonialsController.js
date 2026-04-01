"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const async_1 = require("../middleware/async");
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
module.exports = {
    createReviewer,
    getAllReviewers,
};
