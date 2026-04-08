import Project from "../models/Project";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

type ProjectQuery = {
  title?: string | { $regex: string; $options: string };
  stack?: { $in: RegExp[] };
};

export const getAllProjects = asyncWrapper(
  async (req: Request, res: Response) => {
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

    const project = await result;
    res.status(StatusCodes.OK).json({
      nbHits: project.length,
      success: true,
      data: project,
    });
  },
);

export const getSingleProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: projectID } = req.params;
    const project = await Project.findOne({ _id: projectID });
    if (!project) {
      return next(
        createCustomError(
          `No project with id: ${projectID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: project,
    });
  },
);

export const createProject = asyncWrapper(
  async (req: Request, res: Response) => {
    const project = await Project.create(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: project,
    });
  },
);

export const updateProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: projectID } = req.params;
    const project = await Project.findOneAndUpdate(
      { _id: projectID },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!project) {
      return next(
        createCustomError(
          `No project with id: ${projectID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      data: project,
    });
  },
);

export const deleteProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: projectID } = req.params;
    const project = await Project.findOneAndDelete({ _id: projectID });
    if (!project) {
      return next(
        createCustomError(
          `No project with id: ${projectID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "project deleted successfully",
      data: null,
    });
  },
);
