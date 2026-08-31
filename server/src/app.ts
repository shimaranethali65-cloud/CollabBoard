import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDatabase from "./config/database";

import projectRoutes from "./routes/projectRoutes";

dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI);

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.status(200).json({
    message: "CollabBoard API is running",
    database: "connected"
  });
});

app.use("/api/projects", projectRoutes);

const clientBuildPath = path.resolve(__dirname, "../../client/dist");

// Serve the built React application through the same server as the API.
app.use(express.static(clientBuildPath));

// Let React Router handle client-side routes such as /login and /register.
app.get("/{*splat}", (_request, response) => {
  response.sendFile(path.join(clientBuildPath, "index.html"));
});

export default app;
