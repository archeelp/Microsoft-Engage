import db from "../models/index.js";

const getCourse = async (req, res) => {
  try {
    const course = await db.Course.findOne({ _id: req.params.courseId });
    const recentLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $lte: new Date() },
    }).sort({ createdAt: -1 });
    const activeLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $gte: new Date() },
    });
    res.status(200).json({
      course: { ...course._doc, recentLectures, activeLectures },
      message: "Course retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getCourse,
};
