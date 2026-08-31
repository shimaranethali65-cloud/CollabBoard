"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
dotenv_1.default.config();
if (process.env.MONGO_URI) {
    console.log("MongoDB connected from environment config.");
    (0, database_1.default)();
}
else {
    console.log("MONGO_URI not found. Starting without database connection.");
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/projects", projectRoutes_1.default);
exports.default = app;
