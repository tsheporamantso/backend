import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

import { dashboard } from "../controllers/dashboardController";

router.route("/").get(authenticateUser, dashboard);

export default router;
