import { z } from "zod";
import dayjs from "dayjs";
import { ProductType } from "@prisma/client";

export const createRestaurantSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    profileImage: z.instanceof(File).nullable().optional(),
    backgroundImage: z.instanceof(File).nullable().optional(),
    productType: z.nativeEnum(ProductType),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be a positive number"),
  })
  .refine(
    (data) => {
      const start = dayjs(`1970-01-01T${data.startTime}`);
      const end = dayjs(`1970-01-01T${data.endTime}`);
      return start.isBefore(end);
    },
    {
      message: "La hora de finalización debe ser posterior a la hora de inicio",
      path: ["endTime"],
    },
  );

export type CreateRestaurantType = z.infer<typeof createRestaurantSchema>;
