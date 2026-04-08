"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const servicesController_1 = require("../controllers/servicesController");
router.route("/").get(servicesController_1.getServices).post(servicesController_1.createService);
router
    .route("/:id")
    .get(servicesController_1.getSingleService)
    .patch(servicesController_1.updateService)
    .delete(servicesController_1.deleteService);
exports.default = router;
