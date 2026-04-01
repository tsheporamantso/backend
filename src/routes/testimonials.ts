import express from "express";

const router = express.Router();

const { createReviewer } = require("../controllers/testimonialsController");

router.route("/").post(createReviewer);

module.exports = router;
