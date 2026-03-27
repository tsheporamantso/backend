"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../models/Project"));
const async_1 = require("../middleware/async");
const custom_error_1 = require("../errors/custom-error");
const getAllProjects = (0, async_1.asyncWrapper)(async (req, res) => {
    const { title, sort, stack } = req.query;
    const queryObject = {};
    if (typeof title === "string") {
        queryObject.title = { $regex: title, $options: "i" };
    }
    if (typeof stack === "string") {
        queryObject.stack = { $regex: stack, $options: "i" };
    }
    let result = Project_1.default.find(queryObject);
    if (typeof sort === "string") {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }
    const project = await result;
    res.status(200).json({
        nbHits: project.length,
        success: true,
        data: project,
    });
});
const getSingleProject = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: projectID } = req.params;
    const project = await Project_1.default.findOne({ _id: projectID });
    if (!project) {
        return next((0, custom_error_1.createCustomError)(`No project with id: ${projectID}`, 404));
    }
    res.status(200).json({
        success: true,
        data: project,
    });
});
const createProject = (0, async_1.asyncWrapper)(async (req, res) => {
    const project = await Project_1.default.create(req.body);
    res.status(201).json({
        success: true,
        data: project,
    });
});
const updateProject = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: projectID } = req.params;
    const project = await Project_1.default.findOneAndUpdate({ _id: projectID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!project) {
        return next((0, custom_error_1.createCustomError)(`No project with id: ${projectID}`, 404));
    }
    res.status(200).json({
        success: true,
        data: project,
    });
});
const deleteProject = (0, async_1.asyncWrapper)(async (req, res, next) => {
    const { id: projectID } = req.params;
    const project = await Project_1.default.findOneAndDelete({ _id: projectID });
    if (!project) {
        return next((0, custom_error_1.createCustomError)(`No project with id: ${projectID}`, 404));
    }
    res.status(200).json({
        success: true,
        msg: "project deleted successfully",
        data: null,
    });
});
module.exports = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
};
