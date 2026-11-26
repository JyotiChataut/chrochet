import mongoose from "mongoose";

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    fileName: {
      type: String,
      default: null,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
