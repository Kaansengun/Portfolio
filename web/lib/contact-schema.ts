import { z } from "zod";

export const contactSchema = z.object({
  email: z.email().max(200),
  name: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(5000),
  /** Honeypot: real users never fill this hidden field. */
  company: z.string().max(0).optional(),
  locale: z.enum(["tr", "en"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
