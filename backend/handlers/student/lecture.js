import db from "../../models/index.js";

// Register authenticated student for lecture
const registerForLecture = async (req, res) => {
  try {
    const lecture = await db.Lecture.findOne({
      _id: req.params.lectureId,
      course: req.params.courseId,
      startTime: { $gte: new Date() },
    });
    const student = await db.User.findOne({ _id: req.decodedToken.id });

    // If student matched the minimum vaccination criteria
    if (student.vaccinationStatus >= lecture.vaccinationCriteria) {
      // If lecture is not full
      if (lecture.registeredStudents.length < lecture.offlineLectureCapacity) {
        // If student is not registered for the lecture
        if (lecture.registeredStudents.includes(req.decodedToken.id)) {
          return res.status(200).json({
            message: "You are already registered for this lecture",
          });
        }
        lecture.registeredStudents.push(req.decodedToken.id);
        await lecture.save();
      } else {
        return res.status(400).json({ error: "Lecture is full" });
      }
      return res
        .status(201)
        .json({ message: "Registered for lecture successfully" });
    } else {
      return res.status(400).json({
        error:
          "You are not eligible for this lecture due to vaccination criteria",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  registerForLecture,
};
