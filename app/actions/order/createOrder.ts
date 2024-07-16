"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { createOrderSchema } from "./schemas";

export const createOrder = authActionClient
  .metadata({ actionName: "createOrder" })
  .schema(createOrderSchema)
  .bindArgsSchemas<[productId: z.ZodString]>([z.string().uuid()])
  .action(
    async ({
      parsedInput: { paymentMethod, quantity },
      bindArgsParsedInputs: [productId],
      ctx: { userId },
    }) => {
      console.log({ productId });

      return {
        updated: true,
        //   role: updatedUser.role,
      };
    },
  );
