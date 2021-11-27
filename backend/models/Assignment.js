import mongoose from "mongoose";

// Assignment Schema - Lectures which are created as a part of course
const AssignmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    input: {
      type: String,
      trim: true,
    },
    output: {
      type: String,
      trim: true,
    },
    autoGrade: {
      type: Boolean,
      default: false,
    },
    maxGrade: {
      type: Number,
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Assignment", AssignmentSchema);
