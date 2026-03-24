"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getAllProjects, getSingleProject, createProject, updateProject, deleteProject, } = require("../controllers/projectsController");
router.route("/").get(getAllProjects).post(createProject);
router
    .route("/:id")
    .get(getSingleProject)
    .patch(updateProject)
    .delete(deleteProject);
module.exports = router;
