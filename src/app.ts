import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import connectDB from "./db/connect";
import { getEnvVariable } from "./utils/env";
import projectsRouter from "./routes/projects";
import servicesRouter from "./routes/services";
import testimonialsRouter from "./routes/testimonials";
import sendContactRouter from "./routes/Contacts";
import authRouter from "./routes/auth";
import { notFound } from "./middleware/notFound";
import dashboardRouter from "./routes/dashboard";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandlerMiddleware } from "./middleware/errorHandler";

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
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/contacts", sendContactRouter);
app.use("/api/v1/testimonials", testimonialsRouter);

// swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

// port and server start
const port = process.env.PORT || 5000;

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
