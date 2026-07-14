import { Router } from "express";
import * as controller from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refreshToken);
router.post("/logout", authMiddleware, controller.logout);
router.get("/me", authMiddleware, controller.me);
export default router;
