import { z } from "zod";

export const styleAdvisorSchema = z.object({
  prompt: z.string().trim().min(5, "Please describe what you want to wear."),
  budget: z.coerce.number().positive().optional().or(z.literal("").transform(() => undefined)),
  ageGroup: z.string().trim().optional(),
  location: z.string().trim().optional(),
  comfort: z.string().trim().optional(),
  bodyType: z.string().trim().optional()
});
