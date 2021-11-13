import db from "../../models/index.js";

const getCourses = async (req, res) => {
  try {
    const teacher = await db.Teacher.findOne({
      user: req.decodedToken.id,
    }).populate("courses");
    res
      .status(200)
      .json({ courses: teacher.courses, message: "Courses retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      totalCapacity,
      offlineLectureCapacity,
      onlineLectureLink,
    } = req.body;
    const course = await db.Course.create({
      name,
      description,
      totalCapacity,
      offlineLectureCapacity,
      onlineLectureLink,
      teacher: req.decodedToken.id,
    });
    await db.Teacher.findOneAndUpdate(
      { user: req.decodedToken.id },
      { $push: { courses: course._id } }
    );
    res.status(201).json({ course, message: "Course created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      totalCapacity,
      offlineCapacity,
      onlineLectureLink,
    } = req.body;
    const course = await db.Course.findByIdAndUpdate(req.params.courseId, {
      name,
      description,
      totalCapacity,
      offlineCapacity,
      onlineLectureLink,
    }, {
      new: true,
    });
    res.status(200).json({ message: "Course updated", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await db.Course.findOneAndDelete({ _id: req.params.courseId });
    res.status(202).json({ message: "Course deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await db.Course.findOne({ _id: req.params.courseId }).populate("teacher").populate("enrolledStudents");
    const recentLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $lte: new Date() },
    }).sort({ startTime: -1 }).populate("registeredStudents","name email vaccinationStatus -_id").limit(10);
    const activeLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $gte: new Date() },
    }).sort({ startTime: 1 }).populate("registeredStudents","name email vaccinationStatus -_id");
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
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
};
