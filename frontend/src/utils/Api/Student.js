import axios from "./axios.js";

const StudentApi = {
  getCourses: () => {
    return axios.get("/student/course");
  },
  getCourse: (courseId) => {
    return axios.get(`/student/course/${courseId}`);
  },
  enrollCourse: (courseId) => {
    return axios.post(`/student/course/${courseId}`);
  },
  unEnrollCourse: (courseId) => {
    return axios.delete(`/student/course/${courseId}`);
  },
  registerForLecture: (courseId, lectureId) => {
    return axios.post(`/student/course/${courseId}/lecture/${lectureId}`);
  },
  getSchedule: (date) => {
    return axios.get(`/student/schedule`, { params: { date } });
  },
  getAssignment: (courseId, assignmentId) => {
    return axios.get(`/student/course/${courseId}/assignment/${assignmentId}`);
  },
  submitAssignment: (courseId, assignmentId, submission) => {
    return axios.post(
      `/student/course/${courseId}/assignment/${assignmentId}`,
      submission
    );
  },
};

export default StudentApi;
