import courseHandler from './course.js';
import lectureHandler from './lecture.js';
import scheduleHandler from './schedule.js';
import assignmentHandler from './assignment.js';

export default {
  ...courseHandler,
  ...lectureHandler,
  ...scheduleHandler,
  ...assignmentHandler
}