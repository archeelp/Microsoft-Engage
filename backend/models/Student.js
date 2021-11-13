import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", StudentSchema);
