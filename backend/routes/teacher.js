import express from "express";
import teacherCourseHandler from "../handlers/teacher/course.js";
import teacherLectureHandler from "../handlers/teacher/lecture.js";
import teacherScheduleHandler from "../handlers/teacher/schedule.js";
import middlewares from "../middlewares/index.js";

// Teacher routes
const router = express.Router();

// Teacher schedule rout
router.route("/schedule").get(teacherScheduleHandler.getSchedule);

// Teacher course routes
router
  .route("/course")
  .get(teacherCourseHandler.getCourses)
  .post(teacherCourseHandler.createCourse);

router
  .route("/course/:courseId")
  .get(middlewares.checkCourseCreatedByTeacher, teacherCourseHandler.getCourse)
  .put(
    middlewares.checkCourseCreatedByTeacher,
    teacherCourseHandler.updateCourse
  )
  .delete(
    middlewares.checkCourseCreatedByTeacher,
    teacherCourseHandler.deleteCourse
  );

router
  .route("/course/:courseId/lecture")
  .post(
    middlewares.checkCourseCreatedByTeacher,
    teacherLectureHandler.createLecture
  );

export default router;
