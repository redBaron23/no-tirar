"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { toggleFavoriteRestaurantSchema } from "./schemas";

export const toggleFavoriteRestaurant = authActionClient
  .metadata({ actionName: "toggleFavoriteRestaurant" })
  .schema(toggleFavoriteRestaurantSchema)
  .action(async ({ parsedInput: { restaurantId }, ctx: { userId } }) => {
    const existingFavorite = await prisma.favoriteRestaurant.findUnique({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });

    if (existingFavorite) {
      // If the restaurant is already a favorite, remove it
      await prisma.favoriteRestaurant.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      return { isFavorite: false };
    } else {
      // If the restaurant is not a favorite, add it
      await prisma.favoriteRestaurant.create({
        data: {
          userId,
          restaurantId,
        },
      });
      return { isFavorite: true };
    }
  });
