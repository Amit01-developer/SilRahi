import { z } from "zod";

export const verificationSchema = z.object({
  body: z.object({
    verified: z.boolean()
  })
});
