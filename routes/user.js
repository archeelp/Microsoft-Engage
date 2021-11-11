import express from "express";
import userHandler from "../handlers/user.js";

const router = express.Router();

router.route("/").put(userHandler.updateProfile);

export default router;
