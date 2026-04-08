import express from "express";

const router = express.Router();

import sendContactController from "../controllers/sendContactController";

import { contactLimiter } from "../controllers/contactLimiter";

router.route("/").post(contactLimiter, sendContactController);

export default router;
