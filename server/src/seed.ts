import dotenv from "dotenv";
import path from "path";
import { ensureDefaultAdmin } from "./controllers/authController";
import { prisma } from "./config/prisma";
import connectDatabase from "./config/database";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function seed() {
  await connectDatabase();
  await ensureDefaultAdmin();
  console.log("Database initialized. Only default administrator ensured (admin / admin123).");
  console.log("No hardcoded users, projects, or tasks seeded.");
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
