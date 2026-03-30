"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const env_1 = require("./utils/env");
const router = require("./routes/projects");
const notFound_1 = require("./middleware/notFound");
const errorHandler_1 = require("./middleware/errorHandler");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3001", "https://gladwinramantso.netlify.app"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(process.cwd(), "public/images")));
console.log("CORS FIX IS LIVE 🚀");
app.use("/api/v1/projects", router);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandlerMiddleware);
const port = process.env.PORT || 3000;
async function start() {
    try {
        await (0, connect_1.default)((0, env_1.getEnvVariable)("MONGO_URI"));
        console.log("CONNECTED TO DB...");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
