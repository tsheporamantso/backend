import express from "express";

const router = express.Router();

const {
  getServices,
  createService,
} = require("../controllers/servicesController");

router.route("/").get(getServices).post(createService);

module.exports = router;
