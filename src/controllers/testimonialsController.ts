import { Request, Response, NextFunction } from "express";
import Testimonial from "../models/Testimonial";
import { asyncWrapper } from "../middleware/async";

const createReviewer = asyncWrapper(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({
    success: true,
    testimonial,
  });
});

module.exports = {
  createReviewer,
};
