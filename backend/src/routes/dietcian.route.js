import { Router } from "express";
import { dieticianController } from "../controllers/dietician.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// export const dieticianRoutes = (router) => {
router.get("/dieticians", dieticianController.getDeiticians);
router.post("/dieticians", dieticianController.createDeitician);
router.put("/dieticians/:id", dieticianController.updateDeitician);
router.delete("/dieticians/:id", dieticianController.deleteDeitician);

router.get(
  "/my/assigned-users",
  verifyAuth,
  dieticianController.getMyAssignedUsers,
);

router.get(
  "/my/assigned-dieticians",
  verifyAuth,
  dieticianController.getMyAssignedDeiticians,
);
// };

export { router as dieticianRouter };
