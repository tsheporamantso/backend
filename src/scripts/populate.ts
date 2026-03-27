require("dotenv").config();

import Project from "../models/Project";
import connectDB from "../db/connect";
import { getEnvVariable } from "../utils/env";
import { data } from "../utils/data";

const start = async () => {
  try {
    await connectDB(getEnvVariable("MONGO_URI"));
    await Project.deleteMany();
    await Project.create(data);
    console.log("SUCCESS");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
