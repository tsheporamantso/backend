import Service from "../models/Service";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

const getServices = asyncWrapper(async (req: Request, res: Response) => {
  const services = await Service.find({});
  res
    .status(StatusCodes.OK)
    .json({ nbHits: services.length, success: true, services });
});

const createService = asyncWrapper(async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, service });
});

const getSingleService = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: serviceID } = req.params;
    const service = await Service.findOne({ _id: serviceID });
    if (!service) {
      return next(
        createCustomError(
          `No service with id: ${serviceID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      service,
    });
  },
);

const updateService = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: serviceID } = req.params;
    const service = await Service.findOneAndUpdate(
      { _id: serviceID },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!service) {
      return next(
        createCustomError(
          `No service with id: ${serviceID}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      service,
    });
  },
);

const deleteService = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: serviceID } = req.params;
    const service = await Service.findOneAndDelete({ _id: serviceID });

    if (!service) {
      return next(
        createCustomError(
          `No service with id: ${serviceID}`,
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

module.exports = {
  getServices,
  createService,
  getSingleService,
  updateService,
  deleteService,
};
