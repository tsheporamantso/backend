import { Request, Response } from "express";
import Project from "../models/Project";

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const project = await Project.find({});
    res.status(200).json({
      nbHits: project.length,
      success: true,
      data: project,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: "Something wet wrong",
      });
    }
  }
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

const updateProject = async (req: Request, res: Response) => {
  try {
    const { id: projectID } = req.params;
    const project = await Project.findOneAndUpdate(
      { _id: projectID },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
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
  } catch (error) {
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
