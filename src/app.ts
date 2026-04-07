require("dotenv").config();
import path from "path";
import express from "express";
import connectDB from "./db/connect";
import { getEnvVariable } from "./utils/env";
const router = require("./routes/projects");
const servicesRouter = require("./routes/services");
const testimonialsRouter = require("./routes/testimonials");
const sendContactRouter = require("./routes/sendContact");
import { notFound } from "./middleware/notFound";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "https://gladwinramantso.netlify.app"],
    credentials: true,
  }),
);

// body parse
app.use(express.json());

// static files
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// routes
app.use("/api/v1/projects", router);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/testimonials", testimonialsRouter);
app.use("/api/v1/contacts", sendContactRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

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
