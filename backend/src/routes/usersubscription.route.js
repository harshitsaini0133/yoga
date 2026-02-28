import { Router } from "express";
import { userSubscriptionController } from "../controllers/usersubscription.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id", verifyAuth, userSubscriptionController.getUserSubscription);
router.get("/", verifyAuth, userSubscriptionController.getAllUserSubscription);

export { router as userSubscriptionRouter };
