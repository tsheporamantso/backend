import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

export const getAllUsers = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("get all users");
});

export const getSingleUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("get single user");
});

export const showCurrentUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("show current user");
});

export const updateUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("update user");
});

export const updateUserPassword = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("update user password");
});
