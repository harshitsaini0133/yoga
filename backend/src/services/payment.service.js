// import Razorpay from "razorpay";

// export const createOrder = async (data) => {
//   try {
//     const order = Razorpay.orders.create(data);
//     return order;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const verifyPayment = async (data) => {
//   try {
//     const payment = await Razorpay.payments.fetch(data);
//     return payment;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const capturePayment = async (data) => {
//   try {
//     const payment = await Razorpay.payments.capture(data);
//     return payment;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

import crypto from "crypto";
import { razorpay } from "../utils/razorpay.js";
import prisma from "../lib/prisma.js";

// ================= CREATE ORDER =================
export const createRazorpayOrder = async ({ userId, subscriptionId }) => {
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
  });

  if (!subscription) throw new Error("Subscription not found");
  const amount = subscription.price;
  // Create order in Razorpay
  const razorpayOrder = await razorpay.orders.create({
    amount: amount * 100, // convert to paise
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
    throw new Error("Payment already completed");
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

  const subscription = await prisma.subscription.findUnique({
    where: { id: order.subscriptionId },
  });

  await prisma.userSubscription.create({
    data: {
      userId: order.userId,
      subscriptionId: order.subscriptionId,
      startDate: new Date(),
      endDate: subscription.durationInDays
        ? new Date(
            Date.now() + subscription.durationInDays * 24 * 60 * 60 * 1000,
          )
        : null,
    },
  });

  return { success: true };
};
