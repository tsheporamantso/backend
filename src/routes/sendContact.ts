import express from "express";

const router = express.Router();

import { sendContact, getContacts } from "../controllers/sendContactController";
import { authentication } from "../middleware/authMiddleware";

import { contactLimiter } from "../controllers/contactLimiter";

router.route("/").post(contactLimiter, sendContact);
router.get("/", authentication, getContacts);

export default router;
