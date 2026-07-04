import Project from "../models/Project";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";
import cache from "../utils/cache";

type ProjectQuery = {
  title?: string | { $regex: string; $options: string };
  stack?: { $in: RegExp[] };
};

export const getAllProjects = asyncWrapper(
  async (req: Request, res: Response) => {
    const { title, sort, stack, fields } = req.query;

    // build a unique cache key based on the query params used
    const cacheKey = `projects:${JSON.stringify(req.query)}`;

    // check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log(`✅ CACHE HIT  → ${cacheKey}`);
      res.status(StatusCodes.OK).json(cachedData);
      return;
    }

    console.log(`❌ CACHE MISS → ${cacheKey} (hitting database)`);

    const queryObject: ProjectQuery = {};

    if (typeof title === "string") {
      queryObject.title = { $regex: title, $options: "i" };
    }

    if (typeof stack === "string") {
      const stackValues = stack.split(",").map((item) => new RegExp(item, "i"));
      queryObject.stack = { $in: stackValues };
    }

    let result = Project.find(queryObject).lean();

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

    const responseData = {
      nbHits: project.length,
      success: true,
      data: project,
    };

    // store in cache before responding
    cache.set(cacheKey, responseData);

    res.status(StatusCodes.OK).json(responseData);
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
    cache.flushAll(); // clear cache so new project shows up immediately
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
    cache.flushAll(); // clear cache so new project shows up immediately
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
    cache.flushAll(); // clear cache so new project shows up immediately
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
