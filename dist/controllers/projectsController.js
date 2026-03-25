"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../models/Project"));
const getAllProjects = async (req, res) => {
    try {
        const project = await Project_1.default.find({});
        res.status(200).json({
            nbHits: project.length,
            success: true,
            data: project,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                msg: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                msg: "Something wet wrong",
            });
        }
    }
};
const getSingleProject = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Get a single project",
    });
};
const createProject = async (req, res) => {
    try {
        const project = await Project_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                msg: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                msg: "Something went wrong",
            });
        }
    }
};
const updateProject = async (req, res) => {
    try {
        const { id: projectID } = req.params;
        const project = await Project_1.default.findOneAndUpdate({ _id: projectID }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            res.status(404).json({
                success: false,
                msg: `No project with id: ${projectID}`,
            });
        }
        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                msg: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                msg: "Something went wrong",
            });
        }
    }
};
const deleteProject = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Delete project",
    });
};
module.exports = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
};
