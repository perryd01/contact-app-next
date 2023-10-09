import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  image: z.string().optional(),
});
