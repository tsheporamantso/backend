import express from "express";

const router = express.Router();

import {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController";

router.route("/").get(getAllProjects).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);

export default router;
