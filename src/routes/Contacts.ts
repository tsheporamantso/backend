import express from "express";

const router = express.Router();

import {
  sendContact,
  getContacts,
  deleteContact,
} from "../controllers/ContactController";
import { authenticateUser } from "../middleware/authMiddleware";

import { contactLimiter } from "../controllers/contactLimiter";

router.route("/").post(contactLimiter, sendContact);
router.get("/", authenticateUser, getContacts);
router.route("/:id").delete(authenticateUser, deleteContact);

export default router;
