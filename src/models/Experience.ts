import mongoose, { Schema, Document } from "mongoose";

export interface IExperiences extends Document {
  language: string;
  experience: string;
}

const ExperienceSchema: Schema = new Schema(
  {
    language: {
      type: String,
      required: [true, "Please provide language"],
    },
    experience: {
      type: String,
      enum: {
        values: ["Experienced", "Intermediate"],
        message: "{VALUE} is not supported",
      },
      default: "Experienced",
    },
    category: {
      type: String,
      enum: {
        values: ["frontend", "backend", "database", "tools"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide a category"],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IExperiences>("Experience", ExperienceSchema);
