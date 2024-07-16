"use server";

import { prisma } from "@/lib/prisma";
import { serializeData } from "@/lib/queries/queriesUtils";
import { businessActionClient } from "@/lib/safe-action";
import { uploadImage } from "@/lib/supabaseClient";
import { updateProductSchema, updateProductStatusSchema } from "./schemas";

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

    const imageUrl = await uploadImage(
      image,
      `product-${restaurantId}-${Date.now()}`,
    );

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        type,
        status,
        category,
        regularPrice,
        currentPrice,
        quantity,
        salesCount: 0,
        imageUrl: imageUrl || product.imageUrl,
      },
    });

    return {
      success: true,
      product: serializeData(updatedProduct),
    };
  });

export const updateProductStatus = businessActionClient
  .metadata({ actionName: "updateProductStatus" })
  .schema(updateProductStatusSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const { id, status } = parsedInput;

    // Verify that the product exists and belongs to a restaurant owned by the user
    const product = await prisma.product.findFirst({
      where: {
        id,
        restaurant: {
          userId,
        },
      },
    });

    if (!product) {
      throw new Error(
        "Product not found or you don't have permission to edit it.",
      );
    }

    // Update the product status
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      product: serializeData(updatedProduct),
    };
  });
