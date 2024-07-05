"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { createRestaurantFirstStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";

export const createRestaurantFirstStep = businessActionClient
  .metadata({ actionName: "createRestaurantFirstStep" })
  .schema(createRestaurantFirstStepSchema)
  .action(async ({ parsedInput: restaurantData, ctx: { userId } }) => {
    try {
      const existingRestaurant = await prisma.restaurant.findFirst({
        where: { userId },
      });

      const restaurant = await prisma.restaurant.upsert({
        where: {
          id: existingRestaurant ? existingRestaurant.id : "non-existent-id",
        }, // Use a non-existent ID to force creation if not found
        update: existingRestaurant ? { ...restaurantData } : {}, // Update only if restaurant exists
        create: {
          ...restaurantData,
          userId,
        },
      });

      return {
        success: true,
        restaurant,
      };
    } catch (error) {
      console.error("Error in createRestaurantFirstStep:", error);
      throw new Error("Something went wrong while executing the operation.");
    }
  });
