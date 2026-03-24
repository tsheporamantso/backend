import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  image: string;
  github: string;
  demo: string;
  description: string;
  stack: string[];
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide project title"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide image url"],
    },
    github: {
      type: String,
      required: [true, "Please provide github link"],
    },
    demo: {
      type: String,
      required: [true, "Please provide demo link"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    stack: {
      type: [String],
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProject>("Project", ProjectSchema);
