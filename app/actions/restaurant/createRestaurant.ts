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
      let profileImageUrl =
        typeof profileImage === "string" ? profileImage : undefined;
      let backgroundImageUrl =
        typeof backgroundImage === "string" ? backgroundImage : undefined;

      const uploadPromises = [];

      if (profileImage instanceof File) {
        uploadPromises.push(
          uploadImage(profileImage, `profile-${restaurantId}`).then((url) => {
            profileImageUrl = url;
          }),
        );
      }

      if (backgroundImage instanceof File) {
        uploadPromises.push(
          uploadImage(backgroundImage, `background-${restaurantId}`).then(
            (url) => {
              backgroundImageUrl = url;
            },
          ),
        );
      }

      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }

      const updateData: {
        profileImageUrl?: string;
        backgroundImageUrl?: string | null;
      } = {};

      if (profileImageUrl !== undefined) {
        updateData.profileImageUrl = profileImageUrl;
      }

      if (backgroundImageUrl !== undefined) {
        updateData.backgroundImageUrl = backgroundImageUrl;
      }

      const restaurant = await prisma.restaurant.update({
        where: { id: restaurantId, userId },
        data: updateData,
      });

      return {
        success: true,
        restaurant,
      };
    },
  );
