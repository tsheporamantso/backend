import Project from "../models/Project";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";

type ProjectQuery = {
  title?: string | { $regex: string; $options: string };
  stack?: { $in: RegExp[] };
};

const getAllProjects = asyncWrapper(async (req: Request, res: Response) => {
  const { title, sort, stack, fields } = req.query;
  const queryObject: ProjectQuery = {};

  if (typeof title === "string") {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (typeof stack === "string") {
    const stackValues = stack.split(",").map((item) => new RegExp(item, "i"));
    queryObject.stack = { $in: stackValues };
  }

  let result = Project.find(queryObject);

  // sort
  if (typeof sort === "string") {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // select
  if (typeof fields === "string") {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  console.log(queryObject);

  const project = await result;
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

const updateProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
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
      return next(createCustomError(`No project with id: ${projectID}`, 404));
    }
    res.status(200).json({
      success: true,
      data: project,
    });
  },
);

const deleteProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: projectID } = req.params;
    const project = await Project.findOneAndDelete({ _id: projectID });
    if (!project) {
      return next(createCustomError(`No project with id: ${projectID}`, 404));
    }
    res.status(200).json({
      success: true,
      msg: "project deleted successfully",
      data: null,
    });
  },
);

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
