import express from "express";

const router = express.Router();

import { login, dashboard } from "../controllers/authController";
import { authenticationMiddleware } from "../middleware/authMiddleware";

router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

module.exports = router;
