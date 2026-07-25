import { z } from "zod";

export const bookingPayloadSchema = z.object({
  tailorId: z.string().min(1),
  customerName: z.string().min(2),
  serviceType: z.string().min(2),
  description: z.string().min(3),
  pickupDeliveryAddress: z.string().optional(),
  deliveryDate: z.string().min(8),
  measurements: z.record(z.string()).optional()
});

export const statusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "accepted", "rejected", "in_progress", "ready", "delivered", "cancelled"]),
    paymentAmount: z.preprocess(
      (value) => (value === "" || value === undefined || value === null ? undefined : Number(value)),
      z.number().min(0).optional()
    )
  })
});

export const paymentSchema = z.object({
  body: z.object({
    method: z.enum(["upi", "cash", "other"]).default("upi"),
    reference: z.string().max(120).optional()
  })
});

export const bookingUpdateSchema = z.object({
  body: z.object({
    customerName: z.string().min(2).optional(),
    serviceType: z.string().min(2).optional(),
    description: z.string().min(3).optional(),
    deliveryDate: z.string().min(8).optional(),
    measurements: z.record(z.string(), z.string()).optional()
  })
});
