import { Router } from "express";
import { assignDieticianController } from "../controllers/assigndietician.controller.js";

const router = Router();
// export const assignDieticianRoutes = (router) => {
router.get(
  "/assign-dietician",
  assignDieticianController.getAssignedDieticians,
);
router.post("/assign-dietician", assignDieticianController.assignDietician);
router.put(
  "/assign-dietician/:id",
  assignDieticianController.updateAssignedDietician,
);
router.delete(
  "/assign-dietician/:id",
  assignDieticianController.deleteAssignedDietician,
);
// };

export { router as assignDieticianRouter };
