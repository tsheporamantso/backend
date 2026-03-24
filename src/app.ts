require("dotenv").config();
import path from "path";
import express from "express";
import connectDB from "./db/connect";
import { getEnvVariable } from "./utils/env";

const app = express();

// middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));

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
