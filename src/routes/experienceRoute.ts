import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/authorizePermission";

const router = express.Router();

import {
  getAllExperiences,
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";

router
  .route("/")
  .get(getAllExperiences)
  .post([authenticateUser, authorizePermission("admin")], createExperience);
router
  .route("/:id")
  .get(getSingleExperience)
  .patch([authenticateUser, authorizePermission("admin")], updateExperience)
  .delete([authenticateUser, authorizePermission("admin")], deleteExperience);

export default router;
