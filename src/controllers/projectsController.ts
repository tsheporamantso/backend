import { Request, Response } from "express";
import Project from "../models/Project";

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

const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }
  }
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
