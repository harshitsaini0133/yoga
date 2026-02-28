import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../modules/user/user.validation.js";

const router = Router();
router.get("/all", verifyAuth, userController.getAllUsers);
router.get("/me", verifyAuth, userController.getMe);
router.put(
  "/update",
  verifyAuth,
  validate(updateProfileSchema),
  userController.updateProfile,
);

export { router as userRouter };
