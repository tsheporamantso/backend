import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";

export const getAllExperiences = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("get all experiences");
});

export const getSingleExperience = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("get single experiences");
});

export const createExperience = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.CREATED).json("create experience");
});

export const updateExperience = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.CREATED).json("update experience");
});

export const deleteExperience = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.CREATED).json("delete experience");
});
