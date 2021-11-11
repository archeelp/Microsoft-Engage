import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  offlineLectureCapacity: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
  },
  onlineLectureLink: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  registeredStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  vaccinationCriteria: {
    type     : Number,
    required : true,
    min      : 0,
    max      : 2,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
}, {
  timestamps: true,
});

export default mongoose.model("Lecture", LectureSchema);
