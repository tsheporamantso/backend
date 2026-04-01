import { Request, Response, NextFunction } from "express";
import Testimonial from "../models/Testimonial";
import { asyncWrapper } from "../middleware/async";

const getAllReviewers = asyncWrapper(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.find({});
  res.status(200).json({
    success: true,
    testimonial,
    nbHits: testimonial.length,
  });
});

const createReviewer = asyncWrapper(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({
    success: true,
    testimonial,
  });
});

module.exports = {
  createReviewer,
  getAllReviewers,
};
