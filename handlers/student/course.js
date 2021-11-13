import db from "../../models/index.js";

const getCourses = async (req, res) => {
  try {
    const student = await db.Student.findOne({
      user: req.decodedToken.id,
    }).populate("enrolledCourses");
    res.status(200).json({
      courses: student.enrolledCourses,
      message: "Successfully retrieved courses",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    await db.Student.findOneAndUpdate(
      { user: req.decodedToken.id },
      { $addToSet: { enrolledCourses: req.params.courseId } }
    );
    const course = await db.Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $addToSet: { enrolledStudents: req.decodedToken.id } }
    );
    res.status(201).json({ course, message: "Successfully enrolled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const unenrollCourse = async (req, res) => {
  try {
    await db.Student.findOneAndUpdate(
      { user: req.decodedToken.id },
      { $pull: { enrolledCourses: req.params.courseId } }
    );
    await db.Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $pull: { enrolledStudents: req.decodedToken.id } }
    );
    res.status(201).json({ message: "Successfully unenrolled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await db.Course.findOne({ _id: req.params.courseId }).populate("teacher");
    const recentLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $lte: new Date() },
    }).sort({ startTime: -1 }).limit(10);
    const activeLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $gte: new Date() },
    }).sort({ startTime: 1 });
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
  getCourses,
  enrollCourse,
  unenrollCourse,
  getCourse,
};
