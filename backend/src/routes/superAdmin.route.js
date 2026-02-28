import { Router } from "express";
import { superAdminController } from "../controllers/superAdmin.controller.js";

const router = Router();

router.post("/create-admin", superAdminController.createAdmin);
router.get("/admins", superAdminController.getAllAdmins);

export { router as superAdminRouter };
