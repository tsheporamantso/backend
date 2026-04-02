import express from "express";

const router = express.Router();

const sendContactController = require("../controllers/sendContactController");

import { contactLimiter } from "../controllers/contactLimiter";

router.route("/").post(contactLimiter, sendContactController);

module.exports = router;
