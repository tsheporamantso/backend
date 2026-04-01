import express from "express";

const router = express.Router();

const {
  createReviewer,
  getAllReviewers,
} = require("../controllers/testimonialsController");

router.route("/").post(createReviewer).get(getAllReviewers);

module.exports = router;
