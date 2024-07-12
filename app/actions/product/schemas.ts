import { z } from "zod";

export const deleteProductSchema = z.object({
  productId: z.string(),
  restaurantId: z.string(),
});
