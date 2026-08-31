import cors from "cors";
import express from "express";
import projectRoutes from "./routes/projectRoutes";
const app = express();
app.use(cors()); app.use(express.json()); app.use("/api/projects", projectRoutes);
export default app;
