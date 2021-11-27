import express from "express";
import studentHandler from "../handlers/student/index.js";
import middlewares from "../middlewares/index.js";

// Student routes
const router = express.Router();

// Student schedule route
router.route("/schedule").get(studentHandler.getSchedule);

// Student course routes
router.route("/course").get(studentHandler.getCourses);

router
  .route("/course/:courseId")
  .post(
    middlewares.checkStudentNotEnrolledInCourse,
    studentHandler.enrollCourse
  )
  .get(middlewares.checkStudentEnrolledInCourse, studentHandler.getCourse)
  .delete(
    middlewares.checkStudentEnrolledInCourse,
    studentHandler.unenrollCourse
  );

router
  .route("/course/:courseId/lecture/:lectureId")
  .post(studentHandler.registerForLecture);

// Student Assignment For Course Routes
router
  .route("/course/:courseId/assignment/:assignmentId")
  .get(middlewares.checkStudentEnrolledInCourse, studentHandler.getAssignment)
  .post(
    middlewares.checkStudentEnrolledInCourse,
    studentHandler.submitAssignment
  );

export default router;
