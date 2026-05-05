import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/authorizePermission";

const router = express.Router();

import {
  createReviewer,
  getAllReviewers,
  getSingleReviewer,
  updateReviewer,
  deleteReviewer,
} from "../controllers/testimonialsController";

router
  .route("/")
  .post([authenticateUser, authorizePermission("admin")], createReviewer)
  .get(getAllReviewers);
router
  .route("/:id")
  .get(getSingleReviewer)
  .patch([authenticateUser, authorizePermission("admin")], updateReviewer)
  .delete([authenticateUser, authorizePermission("admin")], deleteReviewer);

export default router;
