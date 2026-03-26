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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "public/images")));
app.use("/api/v1/projects", router);
app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});
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
