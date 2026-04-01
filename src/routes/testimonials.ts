import express from "express";

const router = express.Router();

const {
  createReviewer,
  getAllReviewers,
  getSingleReviewer,
  updateReviewer,
} = require("../controllers/testimonialsController");

router.route("/").post(createReviewer).get(getAllReviewers);
router.route("/:id").get(getSingleReviewer).patch(updateReviewer);

module.exports = router;
