import { Request, Response } from "express";

const getAllProjects = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: "Get all projects",
  });
};

const getSingleProject = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: "Get a single project",
  });
};

const createProject = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: "Create a project",
  });
};

const updateProject = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: "Update project",
  });
};

const deleteProject = (req: Request, res: Response) => {
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
