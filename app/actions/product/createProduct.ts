"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import { ProductStatus, ProductType } from "@prisma/client";
import { updateProductSchema } from "./schemas";

export const updateProduct = businessActionClient
  .metadata({ actionName: "updateProduct" })
  .schema(updateProductSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const {
      id,
      name,
      description,
      type,
      status,
      category,
      regularPrice,
      currentPrice,
      quantity,
      salesCount,
      image,
      restaurantId,
    } = parsedInput;

    // Verify that the product exists and belongs to a restaurant owned by the user
    const product = await prisma.product.findFirst({
      where: {
        id,
        restaurant: {
          userId,
        },
      },
      include: {
        restaurant: true,
      },
    });

    if (!product) {
      throw new Error(
        "Product not found or you don't have permission to edit it.",
      );
    }

    let imageUrl: string | undefined;

    // Handle image upload if a new image file is provided
    if (image instanceof File) {
      imageUrl = await uploadImage(
        image,
        `product-${restaurantId}-${Date.now()}`,
      );
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        type: type || ProductType.SURPRISE,
        status: status || ProductStatus.ACTIVE,
        category,
        regularPrice,
        currentPrice,
        quantity,
        salesCount: salesCount || 0,
        imageUrl: imageUrl || product.imageUrl, // Keep the old image URL if no new image is provided
      },
    });

    return {
      success: true,
      product: updatedProduct,
    };
  });
