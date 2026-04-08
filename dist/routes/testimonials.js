"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const testimonialsController_1 = require("../controllers/testimonialsController");
router.route("/").post(testimonialsController_1.createReviewer).get(testimonialsController_1.getAllReviewers);
router
    .route("/:id")
    .get(testimonialsController_1.getSingleReviewer)
    .patch(testimonialsController_1.updateReviewer)
    .delete(testimonialsController_1.deleteReviewer);
exports.default = router;
