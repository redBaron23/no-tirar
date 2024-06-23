"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { UserRole } from "@prisma/client";
import { z } from "zod";

const updateUserSchema = z.object({
  newRole: z.nativeEnum(UserRole),
});

export const updateUser = authActionClient
  // We can pass the action name inside `metadata()`.
  .metadata({ actionName: "editProfile" })
  // Here we pass the input schema.
  .schema(updateUserSchema)
  // Here we get `userId` from the middleware defined in `authActionClient`.
  .action(async ({ parsedInput: { newRole }, ctx: { userId } }) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    return {
      updated: true,
      role: updatedUser.role,
    };
  });
