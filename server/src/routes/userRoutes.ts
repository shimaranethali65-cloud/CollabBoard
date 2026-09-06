import { Router } from "express";
import { getMe, searchUsers, updateMe } from "../controllers/userController";
import { optionalAuth, requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/search", optionalAuth, searchUsers);
router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);

export default router;
