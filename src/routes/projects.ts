import express from "express";

const router = express.Router();

const {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

router.route("/").get(getAllProjects).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;
