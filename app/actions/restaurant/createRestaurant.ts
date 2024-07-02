"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import { z } from "zod";

const createRestaurantSchema = z.object({
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

export const createRestaurant = businessActionClient
  .metadata({ actionName: "createRestaurant" })
  .schema(createRestaurantSchema)
  .action(async ({ parsedInput: input, ctx: { userId } }) => {
    const { profileImage, backgroundImage, ...rest } = input;

    const profileImageUrl = profileImage
      ? await uploadImage(
          profileImage,
          `profiles/${userId}/profile-${Date.now()}`,
        )
      : null;
    const backgroundImageUrl = backgroundImage
      ? await uploadImage(
          backgroundImage,
          `backgrounds/${userId}/background-${Date.now()}`,
        )
      : null;

    // Insert restaurant data into Prisma
    const restaurant = await prisma.restaurant.create({
      data: {
        ...rest,
        profileImageUrl,
        backgroundImageUrl,
        userId,
      },
    });

    return {
      success: true,
      restaurant,
    };
  });
