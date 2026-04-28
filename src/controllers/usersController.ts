import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import CustomError from "../errors";
import { getAuthUser } from "../utils/getAuthUser";
import { attachCookiesToResponse } from "../utils/cookies";
import { checkPermission } from "../utils/checkPermission";

export const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
});

export const getSingleUser = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  checkPermission(authUser, user._id.toString());

  if (!user) {
    throw new CustomError.BadRequestError(`No user with id: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ user });
});

export const showCurrentUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
});

export const updateUser = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);

  const { username, email } = req.body;
  if (!username || !email) {
    throw new CustomError.BadRequestError("Please provide both email and name");
  }

  const user = await User.findOneAndUpdate(
    { _id: authUser.userId },
    { username, email },
    { runValidators: true, returnDocument: "after" },
  );

  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  const token = user.createJWT();
  attachCookiesToResponse(res, token);

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const updateUserPassword = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide both old and new Passwords",
    );
  }

  const user = await User.findOne({ _id: authUser.userId });
  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  const isPasswordCorrect = await user?.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password updated" });
});
