import { Router } from "express";
import { dietPlanController } from "../controllers/dietplan.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

// export const dietPlanRoutes = (router) => {
const router = Router();
router.get("/dietplans", verifyAuth, dietPlanController.getDietPlans);
router.post("/dietplans", verifyAuth, dietPlanController.createDietPlan);
router.put("/dietplans/:id", verifyAuth, dietPlanController.updateDietPlan);
router.delete("/dietplans/:id", verifyAuth, dietPlanController.deleteDietPlan);

router.get("/my/dietplans", verifyAuth, dietPlanController.getMyDietPlans);
// };

export { router as dietPlanRouter };
