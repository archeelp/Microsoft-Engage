import mongoose from "mongoose";
import Teacher from "./Teacher.js";
import Student from "./Student.js";

// Course Schema - Course which are created by teacher
const CourseSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    totalCapacity: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    offlineLectureCapacity: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    onlineLectureLink: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Clear up the references of course
CourseSchema.pre("deleteOne", async function (next) {
  try {
    // Remove references of course from teacher
    await Teacher.findOneAndUpdate(
      { _id: this.teacher },
      { $pull: { courses: this._id } }
    );
    // Remove references of course from students
    await Student.updateMany(
      { enrolledCourses: this._id },
      { $pull: { courses: this._id } }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("Course", CourseSchema);
