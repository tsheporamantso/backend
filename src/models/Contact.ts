import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  ip: string;
}

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IContact>("Contact", contactSchema);
