import { z } from "zod";

export const courseInputZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isPaid: z.boolean(),
  price: z.number().optional(),
  categoryId: z.string().optional(),
});