import { z } from "zod";

export const toggleFavoriteRestaurantSchema = z.object({
  restaurantId: z.string(),
});
