import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/authorizePermission";

const router = express.Router();

import {
  sendContact,
  getContacts,
  deleteContact,
} from "../controllers/ContactController";

import { contactLimiter } from "../controllers/contactLimiter";

router
  .route("/")
  .post(
    [authenticateUser, authorizePermission("admin")],
    contactLimiter,
    sendContact,
  );
router.get("/", [authenticateUser, authorizePermission("admin")], getContacts);
router
  .route("/:id")
  .delete([authenticateUser, authorizePermission("admin")], deleteContact);

export default router;
