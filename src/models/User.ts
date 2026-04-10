import mongoose, { Schema, Document } from "mongoose";

export interface IAuth extends Document {
  username: string;
  email: string;
  password: string;
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
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

export default mongoose.model<IAuth>("User", userSchema);
