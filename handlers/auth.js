import db from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Generate auth token using JWT
const generateAuthToken = (user) => {
  let { id, role } = user;
  let token = jwt.sign(
    {
      id,
      role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

// Verify users email-password and issue auth token
export const signin = async function (req, res, next) {
  try {
    let { email, password } = req.body;
    let user = await db.User.findOne({ email });
    if(!user) {
      return next({
        status: 400,
        message: "Invalid Email/Password.",
      });
    }
    let isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token = generateAuthToken(user);
      return res.status(200).json({
        user,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password.",
      });
    }
  } catch (error) {
    console.log(error);
    return next({ status: 500, message: error.message });
  }
};

// Register a new user and issue auth token
export const signup = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const token = generateAuthToken(user);
    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    // User already exists
    if (error.code === 11000) {
      error.message = "Sorry, that mobile Number and/or email is taken";
    }
    return next({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  signin,
  signup,
};
