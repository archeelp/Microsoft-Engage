import axios from "./axios.js";

const TeacherApi = {
  getCourses: () => {
    return axios.get("/teacher/course");
  },
  createCourse: (course) => {
    return axios.post("/teacher/course", course);
  },
  getCourse: (courseId) => {
    return axios.get(`/teacher/course/${courseId}`);
  },
  updateCourse: (courseId, course) => {
    return axios.put(`/teacher/course/${courseId}`, course);
  },
  deleteCourse: (courseId) => {
    return axios.delete(`/teacher/course/${courseId}`);
  },
  createLecture: (courseId, lecture) => {
    return axios.post(`/teacher/course/${courseId}/lecture`, lecture);
  },
  getSchedule: (date) => {
    return axios.get(`/teacher/schedule?date=${date}`);
  }
}

export default TeacherApi;