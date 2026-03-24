import express, { Request, Response } from "express";
import { getEnvVariable } from "./utils/env";
import connectDB from "./db/connect";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB(getEnvVariable("MONGO_URI"));
    console.log("CONNECTED TO DB...");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
