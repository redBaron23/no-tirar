"use server";

import { prisma } from "@/lib/prisma";
import { businessActionClient } from "@/lib/safe-action";
import { deleteProductSchema } from "./schemas";

export const deleteProduct = businessActionClient
  .metadata({ actionName: "deleteProduct" })
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { productId, restaurantId } }) => {
    await prisma.product.delete({
      where: {
        id: productId,
        restaurantId: restaurantId,
      },
    });

    return {
      deleted: true,
    };
  });
