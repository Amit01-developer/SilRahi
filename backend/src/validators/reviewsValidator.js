import { z } from "zod";

export const reviewSchema = z.object({
  body: z.object({
    tailorId: z.string().min(1),
    bookingId: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(800).optional()
  })
});
