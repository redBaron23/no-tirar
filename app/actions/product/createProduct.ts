"use server";

import { prisma } from "@/lib/prisma";
import { serializeData } from "@/lib/queries/queriesUtils";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import { createProductSchema } from "./schemas";

export const createProduct = businessActionClient
  .metadata({ actionName: "createProduct" })
  .schema(createProductSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const {
      name,
      description,
      type,
      status,
      category,
      regularPrice,
      currentPrice,
      quantity,
      image,
      restaurantId,
    } = parsedInput;

    // Verify that the restaurant belongs to the user
    const restaurant = await prisma.restaurant.findFirst({
      where: { id: restaurantId, userId },
    });

    if (!restaurant) {
      throw new Error(
        "Restaurant not found or you don't have permission to add products to it.",
      );
    }

    const imageUrl = await uploadImage(
      image,
      `product-${restaurantId}-${Date.now()}`,
    );

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        type: type,
        status: status,
        category,
        regularPrice,
        currentPrice,
        quantity,
        salesCount: 0,
        imageUrl,
        restaurantId,
      },
    });

    return {
      success: true,
      product: serializeData(product),
    };
  });
