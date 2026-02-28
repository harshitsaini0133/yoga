import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/analytics", analyticsController.getAnalytics);

export { router as analyticsRouter };
