import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  profileImage: z.instanceof(File).nullable().optional(),
  backgroundImage: z.instanceof(File).nullable().optional(),
  productType: z.string().min(1, "Product type is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be a positive number"),
});

export type CreateRestaurantType = z.infer<typeof createRestaurantSchema>;
