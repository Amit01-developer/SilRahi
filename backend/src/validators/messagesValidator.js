import { z } from "zod";

export const messageSchema = z.object({
  body: z.object({
    text: z.string().min(1).max(1000)
  })
});
