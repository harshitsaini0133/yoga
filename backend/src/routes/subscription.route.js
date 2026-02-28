import { Router } from "express";
import { subscriptionController } from "../controllers/subscription.controller.js";

const router = Router();
// export const subscriptionRoutes = (router) => {
router.get("/subscriptions", subscriptionController.getSubscriptions);
router.post("/subscriptions", subscriptionController.addSubscription);
router.put("/subscriptions/:id", subscriptionController.updateSubscription);
router.delete("/subscriptions/:id", subscriptionController.deleteSubscription);
// };

export { router as subscriptionRouter };
