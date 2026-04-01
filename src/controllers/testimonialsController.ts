import { Request, Response, NextFunction } from "express";
import Testimonial from "../models/Testimonial";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";

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

const getSingleReviewer = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial.findOne({ _id: reviewerID });

    if (!testimonial) {
      return next(
        createCustomError(`No testimonial wit id: ${reviewerID}`, 404),
      );
    }
    res.status(200).json({
      success: true,
      testimonial,
    });
  },
);

module.exports = {
  createReviewer,
  getAllReviewers,
  getSingleReviewer,
};
