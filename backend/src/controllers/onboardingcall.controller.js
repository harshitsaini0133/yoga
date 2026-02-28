import {
  getMyOnboardingCalls,
  createOnboardingCall,
  getOnboardingCalls,
  deleteOnboardingCall,
  updateOnboardingCall,
} from "../services/onboardingcall.service.js";
import { successResponse } from "../utils/response.js";

export const onboardingCallController = {
  getMyOnboardingCalls: async (req, res) => {
    const onboardingCalls = await getMyOnboardingCalls(req.user.id);
    return successResponse(
      res,
      "My onboarding calls fetched successfully",
      onboardingCalls,
    );
  },
  createOnboardingCall: async (req, res) => {
    const onboardingCall = await createOnboardingCall(req.body);
    return successResponse(
      res,
      "Onboarding call created successfully",
      onboardingCall,
      201,
    );
  },
  getOnboardingCalls: async (req, res) => {
    const onboardingCalls = await getOnboardingCalls();
    return successResponse(
      res,
      "Onboarding calls fetched successfully",
      onboardingCalls,
    );
  },
  updateOnboardingCall: async (req, res) => {
    const id = Number(req.params.id);
    const onboardingCall = await updateOnboardingCall(id, req.body);
    return successResponse(
      res,
      "Onboarding call updated successfully",
      onboardingCall,
    );
  },
  deleteOnboardingCall: async (req, res) => {
    const id = Number(req.params.id);
    const onboardingCall = await deleteOnboardingCall(id);
    return successResponse(
      res,
      "Onboarding call deleted successfully",
      onboardingCall,
    );
  },
};
