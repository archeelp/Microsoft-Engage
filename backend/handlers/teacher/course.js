import db from "../../models/index.js";

// Get all courses for authorised teacher
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

// Create new course for authorised teacher
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

// Update course for authorised teacher
const updateCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      totalCapacity,
      offlineLectureCapacity,
      onlineLectureLink,
    } = req.body;

    const course = await db.Course.findByIdAndUpdate(
      req.params.courseId,
      {
        name,
        description,
        totalCapacity,
        offlineLectureCapacity,
        onlineLectureLink,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Course updated", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete course for authorised teacher
const deleteCourse = async (req, res) => {
  try {
    await db.Course.findOneAndDelete({ _id: req.params.courseId });
    res.status(202).json({ message: "Course deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a particular course for authorised teacher
const getCourse = async (req, res) => {
  try {
    // Get the course
    const course = await db.Course.findOne({ _id: req.params.courseId })
      .populate("teacher")
      .populate("enrolledStudents");

    // Get recent lectures in the course
    const recentLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $lte: new Date() },
    })
      .sort({ startTime: -1 })
      .populate("registeredStudents", "name email vaccinationStatus -_id")
      .limit(10);

    // Get upcoming lectures in the course
    const activeLectures = await db.Lecture.find({
      course: req.params.courseId,
      startTime: { $gte: new Date() },
    })
      .sort({ startTime: 1 })
      .populate("registeredStudents", "name email vaccinationStatus -_id");

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
