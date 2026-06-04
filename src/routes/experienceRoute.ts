import express from "express";

const router = express.Router();

import {
  getAllExperiences,
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";

router.route("/").get(getAllExperiences).post(createExperience);
router
  .route("/:id")
  .get(getSingleExperience)
  .patch(updateExperience)
  .delete(deleteExperience);

export default router;
