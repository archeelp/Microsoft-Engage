import express from "express";
import courseHandler from "../handlers/course.js";
import teacherCourseHandler from "../handlers/teacher/course.js";
import teacherLectureHandler from "../handlers/teacher/lecture.js";
import teacherScheduleHandler from "../handlers/teacher/schedule.js";
import middlewares from "../middlewares/index.js";

const router = express.Router();

router.route("/schedule")
  .get(teacherScheduleHandler.getSchedule);

router.route("/course")
  .get(teacherCourseHandler.getCourses)
  .post(teacherCourseHandler.createCourse);

router.route("/course/:courseId")
  .get(middlewares.checkCourseCreatedByTeacher, courseHandler.getCourse)
  .put(middlewares.checkCourseCreatedByTeacher, teacherCourseHandler.updateCourse)
  .delete(middlewares.checkCourseCreatedByTeacher, teacherCourseHandler.deleteCourse);

router.route("/course/:courseId/lecture")
  .post(middlewares.checkCourseCreatedByTeacher, teacherLectureHandler.createLecture);

export default router;
