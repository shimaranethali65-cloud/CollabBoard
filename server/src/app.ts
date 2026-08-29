import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/database";

import projectRoutes from "./routes/projectRoutes";

dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI);

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);

export default app;