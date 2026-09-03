import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  avatar: string;
  review: string;
  links: string[];
}

const TestimonialSchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, "Please provide reviewers name"],
    trim: true,
  },
  avatar: {
    type: String,
  },
  review: {
    type: String,
    trim: true,
    required: true,
  },
  links: {
    linkedIn: {
      type: String,
    },
    github: {
      type: String,
    },
  },
});

export default mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
