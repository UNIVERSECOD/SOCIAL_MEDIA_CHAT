import { Router } from "express";
const router = Router();
import auth from "../controllers/auth.mjs";
import { authenticate, authorize } from "../middlewares/auth.mjs";




router.post("/login", authenticate, auth.authController.login);

router.post("/register", auth.authController.register)

router.get("/current-user", authorize(), auth.authController.currentUser);

router.post("/logout", auth.authController.logout);

router.post("/forgot-password", auth.authController.forgotPassword);

router.post("/reset-password", auth.authController.resetPassword);

export default router;