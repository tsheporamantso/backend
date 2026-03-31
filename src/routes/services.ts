import express from "express";

const router = express.Router();

const {
  getServices,
  createService,
  getSingleService,
  updateService,
  deleteService,
} = require("../controllers/servicesController");

router.route("/").get(getServices).post(createService);
router
  .route("/:id")
  .get(getSingleService)
  .patch(updateService)
  .delete(deleteService);

module.exports = router;
