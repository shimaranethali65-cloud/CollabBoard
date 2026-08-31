import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config();
const start = async () => { if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured"); await mongoose.connect(process.env.MONGO_URI); app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000")); };
void start().catch((error) => { console.error(error); process.exit(1); });
