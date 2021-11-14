import express from "express";
import authHandler from "../handlers/auth.js";

// Auth routes for signin and signup
const router = express.Router();

router.route("/signin").post(authHandler.signin);
router.route("/signup").post(authHandler.signup);

export default router;
