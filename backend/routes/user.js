import express from "express";
import userHandler from "../handlers/user.js";

// User routes
const router = express.Router();

// User profile routes
router.route("/").get(userHandler.getProfile).put(userHandler.updateProfile);

export default router;
