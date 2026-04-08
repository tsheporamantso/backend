import express from "express";

const router = express.Router();

import {
  createReviewer,
  getAllReviewers,
  getSingleReviewer,
  updateReviewer,
  deleteReviewer,
} from "../controllers/testimonialsController";

router.route("/").post(createReviewer).get(getAllReviewers);
router
  .route("/:id")
  .get(getSingleReviewer)
  .patch(updateReviewer)
  .delete(deleteReviewer);

module.exports = router;
