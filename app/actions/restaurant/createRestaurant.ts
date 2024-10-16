"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import {
  createRestaurantFirstStepSchema,
  createRestaurantImagesStepSchema,
  createRestaurantSecondStepSchema,
  createRestaurantThirdStepSchema,
} from "./schemas";

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
    async ({
      parsedInput: { address, restaurantId, latitude, longitude },
      ctx: { userId },
    }) => {
      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: {
          address,
          latitude,
          longitude,
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
    async ({
      parsedInput: { startTime, endTime, restaurantId, ...productInput },
      ctx: { userId },
    }) => {
      const isoStartTime = dayjs(`1970-01-01T${startTime}`).toISOString();
      const isoEndTime = dayjs(`1970-01-01T${endTime}`).toISOString();

      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: {
          startTime: isoStartTime,
          endTime: isoEndTime,
          isSetupComplete: true,
          products: {
            create: {
              ...productInput,
            },
          },
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
      parsedInput: { profileImage, backgroundImage, restaurantId },
      ctx: { userId },
    }) => {
      const profileImageUrlPromise = uploadImage(
        profileImage,
        `profile-${restaurantId}`,
      );

      const backgroundImageUrlPromise = uploadImage(
        backgroundImage,
        `background-${restaurantId}`,
      );

      const [profileImageUrl, backgroundImageUrl] = await Promise.all([
        profileImageUrlPromise,
        backgroundImageUrlPromise,
      ]);

      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: {
          profileImageUrl,
          backgroundImageUrl,
        },
      });

      return {
        success: true,
        restaurant,
      };
    },
  );
