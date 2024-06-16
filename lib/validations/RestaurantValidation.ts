import { z } from "zod";

export const restaurantValidator = z.object({
  id: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  logo: z.string(),
  bagName: z.string(),
  rating: z.number(),
  pickupTime: z.string(),
  distance: z.number(),
  price: z.number(),
  originalPrice: z.number(),
  itemsLeft: z.number(),
  stars: z.number(),
  reviews: z.number(),
});

export const restaurantArrayValidator = z.array(restaurantValidator);

export type RestaurantType = z.infer<typeof restaurantValidator>;
