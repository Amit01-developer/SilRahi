import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10).max(15),
    role: z.enum(["customer", "tailor"]),
    address: z.string().min(3).optional(),
    location: z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180)
      })
      .optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
    role: z.enum(["customer", "tailor", "admin"]).optional()
  })
});

export const firebaseLoginSchema = z.object({
  body: z.object({
    idToken: z.string().min(10),
    role: z.enum(["customer", "tailor"]).default("customer")
  })
});
