import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  text: string[];
}

const ServiceSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide service title"],
      trim: true,
    },
    text: {
      type: [String],
      required: [true],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IService>("Service", ServiceSchema);
