import mongoose from "mongoose";

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
