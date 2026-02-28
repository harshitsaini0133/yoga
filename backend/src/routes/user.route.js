import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// export const userRoutes = (router) => {
router.get("/all", verifyAuth, userController.getAllUsers);
router.get("/me", verifyAuth, userController.getMe);
// };

export { router as userRouter };
