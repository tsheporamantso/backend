import express from "express";

const router = express.Router();

import { login, dashboard } from "../controllers/authController";

router.route("/login").post(login);
router.route("/dashboard").get(dashboard);

module.exports = router;
