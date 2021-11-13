import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./User.js";
import Student from "./Student.js";
import Teacher from "./Teacher.js";
import Course from "./Course.js";
import Lecture from "./Lecture.js";
dotenv.config();

mongoose.Promise = global.Promise;
const databaseUri =
  process.env.MONGODB_URI || "mongodb://localhost/MicrosoftEngage";

mongoose
  .connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  })
  .then(() => console.log(`Database connected to ${databaseUri}`))
  .catch((err) => console.log(`Database connection error: ${err.message}`));

export default {
  User,
  Student,
  Teacher,
  Course,
  Lecture,
};
