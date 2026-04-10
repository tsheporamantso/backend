import express from "express";

const router = express.Router();

import {
  getServices,
  createService,
  getSingleService,
  updateService,
  deleteService,
} from "../controllers/servicesController";

router.route("/").get(getServices).post(createService);
router
  .route("/:id")
  .get(getSingleService)
  .patch(updateService)
  .delete(deleteService);

export default router;
