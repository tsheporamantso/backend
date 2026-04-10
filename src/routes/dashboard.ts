import express from "express";
import { authentication } from "../middleware/authMiddleware";

const router = express.Router();

import { dashboard } from "../controllers/dashboardController";

router.route("/").get(authentication, dashboard);

export default router;
