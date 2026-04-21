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
import tipsRouter from "./routes/tips";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import helmet from "helmet";

// swagger
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://gladwinramantso.netlify.app",
  "https://editor.swagger.io",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// body parse
app.use(express.json());

// security packages
app.use(helmet());

// Override CORP just for static images
app.use(
  "/images",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(process.cwd(), "public/images")),
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/contacts", sendContactRouter);
app.use("/api/v1/testimonials", testimonialsRouter);
app.use("/api/v1/tips", tipsRouter);

// swagger documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

// port and server start
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
