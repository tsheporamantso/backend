import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/authorizePermission";

const router = express.Router();

import {
  getServices,
  createService,
  getSingleService,
  updateService,
  deleteService,
} from "../controllers/servicesController";

router
  .route("/")
  .get(getServices)
  .post([authenticateUser, authorizePermission("admin")], createService);
router
  .route("/:id")
  .get(getSingleService)
  .patch([authenticateUser, authorizePermission("admin")], updateService)
  .delete([authenticateUser, authorizePermission("admin")], deleteService);

export default router;
