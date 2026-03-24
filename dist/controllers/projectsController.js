"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllProjects = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Get all projects",
    });
};
const getSingleProject = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Get a single project",
    });
};
const createProject = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Create a project",
    });
};
const updateProject = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Update project",
    });
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
