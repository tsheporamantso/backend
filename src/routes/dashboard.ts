import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/authorizePermission";

const router = express.Router();

import { dashboard } from "../controllers/dashboardController";

router
  .route("/")
  .get([authenticateUser, authorizePermission("admin")], dashboard);

export default router;
