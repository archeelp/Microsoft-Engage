import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import db from "../models/index.js";

// Middleware to check if the user is authenticated
export const loginRequired = (req, res, next) => {
  try {
    // Get the JWT token from the header
    const token = req.headers.authorization.split(" ")[1];
    // Verify the token
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

// Returns a middleware if user is authorised for a particular role
export const checkRoleAndId = (role) => {
  return (req, res, next) => {
    // Role is matched with the role of the user
    if (req.decodedToken?.role === role) {
      next();
    } else {
      return next({ status: 403, message: "Forbidden to access" });
    }
  };
};

// Middleware to check if the teacher is authorised to access a particular course
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

// Middleware to check if the student is authorised to access a particular course
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

// Middleware to check if the student is not enrolled in a particular course
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
