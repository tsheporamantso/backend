import express from "express";

const router = express.Router();

const {
  createReviewer,
  getAllReviewers,
  getSingleReviewer,
} = require("../controllers/testimonialsController");

router.route("/").post(createReviewer).get(getAllReviewers);
router.route("/:id").get(getSingleReviewer);

module.exports = router;
