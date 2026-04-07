import mongoose, { Schema, Document } from "mongoose";

export interface IAuth extends Document {
  username: string;
  password: string;
}

const authSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

export default mongoose.model<IAuth>("authentication", authSchema);
