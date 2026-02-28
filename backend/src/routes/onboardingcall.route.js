import { Router } from "express";
import { onboardingCallController } from "../controllers/onboardingcall.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/onboardingcalls", onboardingCallController.getOnboardingCalls);
router.post("/onboardingcalls", onboardingCallController.createOnboardingCall);
router.put(
  "/onboardingcalls/:id",
  onboardingCallController.updateOnboardingCall,
);
router.delete(
  "/onboardingcalls/:id",
  onboardingCallController.deleteOnboardingCall,
);

router.get(
  "/my/onboardingcalls",
  verifyAuth,
  onboardingCallController.getMyOnboardingCalls,
);
export { router as onboardingCallRouter };
