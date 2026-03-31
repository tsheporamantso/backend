import { Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";
import Service from "../models/Service";

const getServices = asyncWrapper(async (req: Request, res: Response) => {
  res.status(200).json({ msg: "get all services" });
});

const createService = asyncWrapper(async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  res.status(200).json({ success: true, service });
});

module.exports = {
  getServices,
  createService,
};
