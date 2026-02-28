import crypto from "crypto";
import { razorpay } from "../utils/razorpay.js";
import prisma from "../lib/prisma.js";

export const createRazorpayOrder = async ({ userId, subscriptionId }) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) throw new Error("Subscription not found");

    const amount = subscription.price.toNumber(); // ✅ convert Decimal
    const amountInPaise = Math.round(amount * 100);

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save order in DB
    const order = await prisma.order.create({
      data: {
        userId,
        subscriptionId,
        amount,
        razorpayOrderId: razorpayOrder.id,
        status: "PENDING",
      },
    });

    return { razorpayOrder, order };
  } catch (error) {
    console.error("Error in createRazorpayOrder:", error);
    throw new Error(error.message || "Failed to create Razorpay order");
  }
};

// ================= VERIFY PAYMENT =================
export const verifyRazorpayPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const order = await prisma.order.findUnique({
    where: { razorpayOrderId: razorpay_order_id },
  });

  const orderId = order.id;
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === "COMPLETED") {
    return { success: true, message: "Payment already processed" };
  }

  if (expectedSignature !== razorpay_signature) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "FAILED" },
    });

    throw new Error("Payment verification failed");
  }

  // Update DB status
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "COMPLETED", paymentId: razorpay_payment_id },
  });

  const durationMap = {
    MONTHLY: 30,
    QUARTERLY: 90,
    YEARLY: 365,
  };

  const subscription = await prisma.subscription.findUnique({
    where: { id: order.subscriptionId },
  });

  if (!subscription) throw new Error("Subscription type not found");

  const daysToAdd = durationMap[subscription.duration] || 0;

  const endDate =
    daysToAdd > 0
      ? new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000)
      : null;

  await prisma.userSubscription.create({
    data: {
      userId: order.userId,
      subscriptionId: order.subscriptionId,
      startDate: new Date(),
      endDate: endDate,
    },
  });

  return { success: true };
};
