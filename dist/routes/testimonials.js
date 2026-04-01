"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { createReviewer, getAllReviewers, getSingleReviewer, updateReviewer, deleteReviewer, } = require("../controllers/testimonialsController");
router.route("/").post(createReviewer).get(getAllReviewers);
router
    .route("/:id")
    .get(getSingleReviewer)
    .patch(updateReviewer)
    .delete(deleteReviewer);
module.exports = router;
