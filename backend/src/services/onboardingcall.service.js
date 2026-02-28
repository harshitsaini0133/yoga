import prisma from "../lib/prisma.js";

export const getMyOnboardingCalls = async (id) => {
  try {
    const onboardingCalls = await prisma.onBoardingCall.findMany({
      where: { userId: id },
    });
    return onboardingCalls;
  } catch (error) {
    throw new Error(error);
  }
};
export const createOnboardingCall = async (data) => {
  try {
    const onboardingCall = await prisma.onBoardingCall.create({
      data,
    });
    return onboardingCall;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOnboardingCalls = async () => {
  try {
    const onboardingCalls = await prisma.onBoardingCall.findMany({});
    return onboardingCalls;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateOnboardingCall = async (id, data) => {
  try {
    const onboardingCall = await prisma.onBoardingCall.update({
      where: { id },
      data,
    });
    return onboardingCall;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOnboardingCall = async (id) => {
  try {
    const onboardingCall = await prisma.onBoardingCall.delete({
      where: { id },
    });
    return onboardingCall;
  } catch (error) {
    throw new Error(error);
  }
};
