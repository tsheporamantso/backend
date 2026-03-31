import Service from "../models/Service";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/async";
import { createCustomError } from "../errors/custom-error";

const getServices = asyncWrapper(async (req: Request, res: Response) => {
  const services = await Service.find({});
  res.status(200).json({ nbHits: services.length, success: true, services });
});

const createService = asyncWrapper(async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, service });
});

const getSingleService = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: serviceID } = req.params;
    const service = await Service.findOne({ _id: serviceID });
    if (!service) {
      return next(createCustomError(`No service with id: ${serviceID}`, 404));
    }
    res.status(200).json({
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
      return next(createCustomError(`No service with id: ${serviceID}`, 404));
    }
    res.status(200).json({
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
      return next(createCustomError(`No service with id: ${serviceID}`, 404));
    }
    res.status(200).json({
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
