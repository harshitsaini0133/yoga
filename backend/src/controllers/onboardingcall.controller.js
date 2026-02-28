import {
  getMyOnboardingCalls,
  createOnboardingCall,
  getOnboardingCalls,
  deleteOnboardingCall,
  updateOnboardingCall,
} from "../services/onboardingcall.service.js";

export const onboardingCallController = {
  getMyOnboardingCalls: async (req, res) => {
    try {
      const onboardingCalls = await getMyOnboardingCalls(req.user.id);
      res.status(200).json(onboardingCalls);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  createOnboardingCall: async (req, res) => {
    try {
      const onboardingCall = await createOnboardingCall(req.body);
      res.status(201).json(onboardingCall);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  getOnboardingCalls: async (req, res) => {
    try {
      const onboardingCalls = await getOnboardingCalls();
      res.status(200).json(onboardingCalls);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateOnboardingCall: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const onboardingCall = await updateOnboardingCall(id, req.body);
      res.status(200).json(onboardingCall);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  deleteOnboardingCall: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const onboardingCall = await deleteOnboardingCall(id);
      res.status(200).json(onboardingCall);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
