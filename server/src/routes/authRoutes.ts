import { Router } from "express";
import { getCurrentUser, login, adminLogin, register } from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/me", requireAuth, getCurrentUser);

export default router;
