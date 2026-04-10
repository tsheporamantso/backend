import express from "express";

const router = express.Router();

import { login, dashboard, register } from "../controllers/authController";
import { authentication } from "../middleware/authMiddleware";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authentication, dashboard);

export default router;
