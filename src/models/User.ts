import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { getEnvVariable } from "../utils/env";

export interface IAuth extends Document {
  username: string;
  email: string;
  password: string;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minLength: [3, "Username too short"],
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const options: SignOptions = {
  expiresIn: getEnvVariable("JWT_EXPIRES_IN") as SignOptions["expiresIn"],
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    getEnvVariable("JWT_SECRET"),
    options,
  );
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model<IAuth>("User", userSchema);
