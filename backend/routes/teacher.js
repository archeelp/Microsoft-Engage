import express from "express";
import teacherHandler from "../handlers/teacher/index.js";
import middlewares from "../middlewares/index.js";

// Teacher routes
const router = express.Router();

// Teacher schedule rout
router.route("/schedule").get(teacherHandler.getSchedule);

// Teacher course routes
router
  .route("/course")
  .get(teacherHandler.getCourses)
  .post(teacherHandler.createCourse);

router
  .route("/course/:courseId")
  .get(middlewares.checkCourseCreatedByTeacher, teacherHandler.getCourse)
  .put(middlewares.checkCourseCreatedByTeacher, teacherHandler.updateCourse)
  .delete(middlewares.checkCourseCreatedByTeacher, teacherHandler.deleteCourse);

router
  .route("/course/:courseId/lecture")
  .post(middlewares.checkCourseCreatedByTeacher, teacherHandler.createLecture);

// Teachers Assignment Management For Course Routes
router
  .route("/course/:courseId/assignment")
  .post(
    middlewares.checkCourseCreatedByTeacher,
    teacherHandler.createAssignment
  );

router
  .route("/course/:courseId/assignment/:assignmentId")
  .get(middlewares.checkCourseCreatedByTeacher, teacherHandler.getAssignment);

router
  .route("/course/:courseId/assignment/:assignmentId/submission/:submissionId")
  .post(
    middlewares.checkCourseCreatedByTeacher,
    teacherHandler.gradeSubmission
  );

export default router;
