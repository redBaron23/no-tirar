import { BusinessType, ContactMethodType, ProductType } from "@prisma/client";
import dayjs from "dayjs";
import { z } from "zod";

export const createRestaurantFirstStepSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  type: z.nativeEnum(BusinessType),
  contactMethod: z.nativeEnum(ContactMethodType),
});

export const createRestaurantSecondStepSchema = z.object({
  address: z.string().min(1, "La dirección es obligatoria"),
  restaurantId: z.string(),
});

export const createRestaurantThirdStepSchema = z
  .object({
    restaurantId: z.string(),
    description: z.string(),
    productType: z.nativeEnum(ProductType),
    startTime: z.string().min(1, "La hora de inicio es obligatoria"),
    endTime: z.string().min(1, "La hora de finalización es obligatoria"),
    quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
    regularPrice: z.number().min(0, "El precio debe ser un número positivo"),
    currentPrice: z.number().min(0, "El precio debe ser un número positivo"),
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
  )
  .refine((data) => data.regularPrice > data.currentPrice, {
    message: "El precio regular debe ser mayor que el precio actual",
    path: ["regularPrice", "currentPrice"],
  });

// profileImage: z.instanceof(File).nullable().optional(),
// backgroundImage: z.instanceof(File).nullable().optional(),
