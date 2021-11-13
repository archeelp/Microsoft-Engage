import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import teacherRoutes from "./teacher.js";
import studentRoutes from "./student.js";

import middlewares from "../middlewares/index.js";

import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../openapi.json");

const router = express.Router();

router.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/auth", authRoutes);

router.use("/user", middlewares.loginRequired, userRoutes);
router.use(
  "/teacher",
  middlewares.loginRequired,
  middlewares.checkRoleAndId("teacher"),
  teacherRoutes
);
router.use(
  "/student",
  middlewares.loginRequired,
  middlewares.checkRoleAndId("student"),
  studentRoutes
);

export default router;
