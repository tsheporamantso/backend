import { Request, Response, NextFunction } from "express";
import Testimonial from "../models/Testimonial";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

const getAllReviewers = asyncWrapper(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    testimonial,
    nbHits: testimonial.length,
  });
});

const createReviewer = asyncWrapper(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(StatusCodes.CREATED).json({
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
        createCustomError(
          `No testimonial with id: ${reviewerID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      testimonial,
    });
  },
);

const updateReviewer = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: reviewerID },
      req.body,
      {
        runValidators: true,
        returnDocument: "after",
      },
    );
    if (!testimonial) {
      return next(
        createCustomError(
          `No testimonial with id: ${reviewerID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      testimonial,
    });
  },
);

const deleteReviewer = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: reviewerID } = req.params;
    const testimonial = await Testimonial.findOneAndDelete({ _id: reviewerID });

    if (!testimonial) {
      return next(
        createCustomError(
          `No testimonial with id: ${reviewerID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Testimonial successfully deleted.",
      data: null,
    });
  },
);

module.exports = {
  createReviewer,
  getAllReviewers,
  getSingleReviewer,
  updateReviewer,
  deleteReviewer,
};
