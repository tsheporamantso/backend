import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import Experience from "../models/Experience";
import { createCustomError } from "../errors/custom-error";

export const getAllExperiences = asyncWrapper(async (req, res) => {
  const experiences = await Experience.find({});
  res
    .status(StatusCodes.OK)
    .json({ nbHits: experiences.length, success: true, experiences });
});

export const getSingleExperience = asyncWrapper(async (req, res, next) => {
  const { id: experienceId } = req.params;
  const experience = await Experience.findOne({ _id: experienceId });

  if (!experience) {
    return next(
      createCustomError(
        `No experience with id: ${experienceId}`,
        StatusCodes.NOT_FOUND,
      ),
    );
  }
  res.status(StatusCodes.OK).json({ success: true, experience });
});

export const createExperience = asyncWrapper(async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, experience });
});

export const updateExperience = asyncWrapper(async (req, res, next) => {
  const { id: experienceId } = req.params;
  const experience = await Experience.findOneAndUpdate(
    { _id: experienceId },
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!experience) {
    return next(
      createCustomError(
        `No experience with id: ${experienceId}`,
        StatusCodes.NOT_FOUND,
      ),
    );
  }
  res.status(StatusCodes.OK).json({ success: true, experience });
});

export const deleteExperience = asyncWrapper(async (req, res, next) => {
  const { id: experienceId } = req.params;
  const experience = await Experience.deleteOne({ _id: experienceId });

  if (!experience) {
    return next(
      createCustomError(
        `No experience with id: ${experienceId}`,
        StatusCodes.NOT_FOUND,
      ),
    );
  }

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: "experience deleted successfully" });
});
