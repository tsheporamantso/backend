"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getServices, createService, getSingleService, updateService, deleteService, } = require("../controllers/servicesController");
router.route("/").get(getServices).post(createService);
router
    .route("/:id")
    .get(getSingleService)
    .patch(updateService)
    .delete(deleteService);
module.exports = router;
