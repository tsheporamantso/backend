import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/authorizePermission";

const router = express.Router();

import {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController";

router
  .route("/")
  .get(getAllProjects)
  .post([authenticateUser, authorizePermission("admin")], createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch([authenticateUser, authorizePermission("admin")], updateProject)
  .delete([authenticateUser, authorizePermission("admin")], deleteProject);

export default router;
