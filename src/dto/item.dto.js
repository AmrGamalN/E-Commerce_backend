import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category: z.string().min(1),
  })
;

export const updateItemSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().optional(),
  })
;
