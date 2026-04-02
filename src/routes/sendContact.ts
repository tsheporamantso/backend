import express from "express";

const router = express.Router();

const sendContactController = require("../controllers/sendContactController");

router.route("/").post(sendContactController);

module.exports = router;
