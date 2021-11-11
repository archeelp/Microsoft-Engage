import db from "../../models/index.js";

const createLecture = async (req, res) => {
  try {
    const {
      startTime,
      endTime,
      offlineLectureCapacity,
      onlineLectureLink,
      vaccinationCriteria,
    } = req.body;
    const lecture = await db.Lecture.create({
      startTime,
      endTime,
      offlineLectureCapacity,
      onlineLectureLink,
      course: req.params.courseId,
      vaccinationCriteria,
    });
    res.status(201).json({ lecture, message: "Lecture created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  createLecture,
};
