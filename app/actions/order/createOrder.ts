"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { createOrderSchema } from "./schemas";

export const createOrder = authActionClient
  .metadata({ actionName: "createOrder" })
  .schema(createOrderSchema)
  .bindArgsSchemas<[productId: z.ZodString]>([z.string()])
  .action(
    async ({
      parsedInput: { paymentMethod, quantity },
      bindArgsParsedInputs: [productId],
      ctx: { userId },
    }) => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { restaurantId: true, currentPrice: true },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      const totalAmount = quantity * product.currentPrice.toNumber();

      const order = await prisma.order.create({
        data: {
          userId,
          productId,
          restaurantId: product.restaurantId,
          paymentMethod,
          productQuantity: quantity,
          totalAmount,
        },
      });

      return {
        updated: true,
        orderId: order.id,
      };
    },
  );
