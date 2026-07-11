import { z } from "zod";

export const profileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    shopName: z.string().min(2).optional(),
    shopType: z.enum(["Home-based", "Shop", "Online"]).optional(),
    phone: z.string().min(10).max(15).optional(),
    address: z.string().min(3).optional(),
    location: z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180)
      })
      .optional(),
    skills: z.array(z.string()).optional(),
    serviceFees: z
      .array(
        z.object({
          service: z.string().min(2),
          fee: z.string().min(1)
        })
      )
      .optional(),
    experienceYears: z.number().min(0).max(80).optional(),
    priceRange: z.string().optional(),
    paymentUpiId: z.string().max(100).optional(),
    paymentPhone: z.string().max(15).optional(),
    availability: z.enum(["available", "busy", "offline"]).optional(),
    about: z.string().max(1000).optional(),
    workSamples: z.array(z.string().url()).optional()
  })
});
