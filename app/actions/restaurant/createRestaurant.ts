"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import {
  createRestaurantFirstStepSchema,
  createRestaurantImagesStepSchema,
  createRestaurantSecondStepSchema,
  createRestaurantThirdStepSchema,
} from "@/lib/validations/actions/restaurant/createRestaurant";

export const createRestaurantFirstStep = businessActionClient
  .metadata({ actionName: "createRestaurantFirstStep" })
  .schema(createRestaurantFirstStepSchema)
  .action(async ({ parsedInput: restaurantData, ctx: { userId } }) => {
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
  });

export const createRestaurantSecondStep = businessActionClient
  .metadata({ actionName: "createRestaurantSecondStep" })
  .schema(createRestaurantSecondStepSchema)
  .action(
    async ({ parsedInput: { address, restaurantId }, ctx: { userId } }) => {
      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: {
          address,
        },
      });

      return {
        success: true,
        restaurant,
      };
    },
  );

export const createRestaurantThirdStep = businessActionClient
  .metadata({ actionName: "createRestaurantThirdStep" })
  .schema(createRestaurantThirdStepSchema)
  .action(
    async ({ parsedInput: { address, restaurantId }, ctx: { userId } }) => {
      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: {
          address,
        },
      });

      return {
        success: true,
        restaurant,
      };
    },
  );

export const createRestaurantImagesStep = businessActionClient
  .metadata({ actionName: "createRestaurantImagesStep" })
  .schema(createRestaurantImagesStepSchema)
  .action(
    async ({
      parsedInput: { profileImage, restaurantId },
      ctx: { userId },
    }) => {
      const profileImageUrl = await uploadImage(
        profileImage,
        `profile-${userId}`,
      );

      console.log({ profileImageUrl });

      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: {
          profileImageUrl,
        },
      });

      return {
        success: true,
        restaurant,
      };
    },
  );
