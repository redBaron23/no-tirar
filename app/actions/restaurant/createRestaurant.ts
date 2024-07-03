"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import { createRestaurantSchema } from "@/lib/validations/actions/restaurant/createRestaurant";

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
