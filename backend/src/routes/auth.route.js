import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();
// router.post("/register", authController.register);
// router.post("/login", authController.login);

router.post("/getverify", authController.getVerify);

router.post("/admin/login", authController.adminLogin);

export { router as authRouter };
