import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  sendOtpSchema,
  verifyOtpSchema,
  resendOtpSchema,
  adminLoginSchema,
} from "../modules/auth/auth.validation.js";

const router = Router();

// 1. Send OTP (Simulated)
router.post("/getverify", validate(sendOtpSchema), authController.getVerify);

// 2. Verify OTP
router.post("/verify", validate(verifyOtpSchema), authController.verifyOtp);

// 3. Resend OTP
router.post("/resend", validate(resendOtpSchema), authController.resendOtp);

// 4. Admin Login
router.post(
  "/admin/login",
  validate(adminLoginSchema),
  authController.adminLogin,
);

export { router as authRouter };
