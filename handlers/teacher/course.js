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
    await db.Course.findByIdAndUpdate(req.params.courseId, {
      name,
      description,
      totalCapacity,
      offlineCapacity,
      onlineLectureLink,
    });
    res.status(200).json({ message: "Course updated" });
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

export default {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
