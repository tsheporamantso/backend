import Project from "../models/Project";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";

const getAllProjects = asyncWrapper(async (req: Request, res: Response) => {
  const project = await Project.find({});
  res.status(200).json({
    nbHits: project.length,
    success: true,
    data: project,
  });
});

const getSingleProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: projectID } = req.params;
    const project = await Project.findOne({ _id: projectID });
    if (!project) {
      return next(createCustomError(`No project with id: ${projectID}`, 404));
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  },
);

const createProject = asyncWrapper(async (req: Request, res: Response) => {
  const project = await Project.create(req.body);
  res.status(201).json({
    success: true,
    data: project,
  });
});

const updateProject = asyncWrapper(async (req: Request, res: Response) => {
  const { id: projectID } = req.params;
  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    res.status(404).json({
      success: false,
      msg: `No project with id: ${projectID}`,
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: project,
  });
});

const deleteProject = asyncWrapper(async (req: Request, res: Response) => {
  const { id: projectID } = req.params;
  const project = await Project.findOneAndDelete({ _id: projectID });
  if (!project) {
    res.status(404).json({
      success: false,
      msg: `no project with id: ${projectID}`,
    });
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
