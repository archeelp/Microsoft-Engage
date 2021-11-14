import express from "express";
import studentCourseHandler from "../handlers/student/course.js";
import studentScheduleHandler from "../handlers/student/schedule.js";
import middlewares from "../middlewares/index.js";
import studentLectureHandler from "../handlers/student/lecture.js";

// Student routes
const router = express.Router();

// Student schedule route
router.route("/schedule").get(studentScheduleHandler.getSchedule);

// Student course routes
router.route("/course").get(studentCourseHandler.getCourses);

router
  .route("/course/:courseId")
  .post(
    middlewares.checkStudentNotEnrolledInCourse,
    studentCourseHandler.enrollCourse
  )
  .get(middlewares.checkStudentEnrolledInCourse, studentCourseHandler.getCourse)
  .delete(
    middlewares.checkStudentEnrolledInCourse,
    studentCourseHandler.unenrollCourse
  );

router
  .route("/course/:courseId/lecture/:lectureId")
  .post(studentLectureHandler.registerForLecture);

export default router;
