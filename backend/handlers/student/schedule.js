import db from "../../models/index.js";
import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";
import { getTimeStamp } from "../../utils/time.js";

// Get schedule of a student on a specific day
export const getSchedule = async (req, res) => {
  try {
    const queryDate = req.query.date;
    const student = await db.Student.findOne({ user: req.decodedToken.id });

    // Get all lectures of the student between the start and end of the day
    const lectures = await db.Lecture.find({
      startTime: {
        $gte: startOfDay(getTimeStamp(queryDate)),
        $lte: endOfDay(getTimeStamp(queryDate)),
      },
      course: {
        $in: student.enrolledCourses,
      },
    }).populate("course");
    
    res.status(200).json({ lectures, message: "Lectures fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getSchedule,
};
