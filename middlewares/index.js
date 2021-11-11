import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import db from "../models/index.js";

export const loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        req.decodedToken = decoded;
        next();
      } else {
        return next({ status: 401, message: "Please Log In First" });
      }
    });
  } catch (error) {
    console.log(error);
    return next({ status: 401, message: "Please Log In First" });
  }
};

export const checkRoleAndId = (role) => {
  return (req, res, next) => {
    if (req.decodedToken?.role === role) {
      next();
    } else {
      return next({ status: 403, message: "Forbidden to access" });
    }
  };
};

export const checkCourseCreatedByTeacher = async (req, res, next) => {
  try {
    const course = await db.Course.findOne({
      teacher: req.decodedToken?.id,
      _id: req.params.courseId,
    });
    if (course) {
      next();
    } else {
      return next({ status: 403, message: "Forbidden to access" });
    }
  } catch (error) {
    console.log(error);
    return next({ status: 500, message: "Internal error" });
  }
};

export const checkStudentEnrolledInCourse = async (req, res, next) => {
  try {
    const course = await db.Course.findOne({
      _id: req.params.courseId,
      enrolledStudents: req.decodedToken?.id,
    });
    console.log(
      { _id: req.params.courseId, enrolledStudents: req.decodedToken?.id },
      course
    );
    if (course) {
      next();
    } else {
      return next({ status: 403, message: "Forbidden to access" });
    }
  } catch (error) {
    console.log(error);
    return next({ status: 500, message: "Internal error" });
  }
};

export const checkStudentNotEnrolledInCourse = async (req, res, next) => {
  try {
    const course = await db.Course.findOne({
      _id: req.params.courseId,
      enrolledStudents: req.decodedToken?.id,
    });
    if (!course) {
      next();
    } else {
      return next({ status: 200, message: "Already Enrolled" });
    }
  } catch (error) {
    console.log(error);
    return next({ status: 500, message: "Internal error" });
  }
};

export default {
  loginRequired,
  checkRoleAndId,
  checkCourseCreatedByTeacher,
  checkStudentEnrolledInCourse,
  checkStudentNotEnrolledInCourse,
};
