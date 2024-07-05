"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { createRestaurantFirstStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";

export const createRestaurantFirstStep = businessActionClient
  .metadata({ actionName: "createRestaurant" })
  .schema(createRestaurantFirstStepSchema)
  .action(async ({ parsedInput: restaurantData, ctx: { userId } }) => {
    const existingRestaurant = await prisma.restaurant.findFirst({
      where: { userId },
    });

    const restaurant = await prisma.restaurant.upsert({
      where: { id: existingRestaurant ? existingRestaurant.id : "" }, // Use the existing restaurant ID or a fallback value
      update: {
        ...restaurantData,
      },
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

// const profileImageUrl = profileImage
//   ? await uploadImage(
//       profileImage,
//       `profiles/${userId}/profile-${Date.now()}`,
//     )
//   : null;

// const backgroundImageUrl = backgroundImage
//   ? await uploadImage(
//       backgroundImage,
//       `backgrounds/${userId}/background-${Date.now()}`,
//     )
//   : null;

// // Insert restaurant data into Prisma
// const restaurant = await prisma.restaurant.create({
//   data: {
//     ...restaurantData,
//     profileImageUrl,
//     backgroundImageUrl,
//     userId,
//     startTime: new Date(`1970-01-01T${restaurantData.startTime}`),
//     endTime: new Date(`1970-01-01T${restaurantData.endTime}`),
//     products: {
//       create: {
//         name: "Surprise Box", // You might want to adjust this
//         description: "A surprise product", // You might want to adjust this
//         productType,
//         quantity,
//         price,
//       },
//     },
//   },
//   include: {
//     products: true,
//   },
