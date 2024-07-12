import { BusinessType, ContactMethodType, ProductType } from "@prisma/client";
import dayjs from "dayjs";
import { z } from "zod";

export const createRestaurantFirstStepSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  description: z.string().optional(),
  phone: z.string().min(1, "El teléfono es obligatorio."),
  type: z.nativeEnum(BusinessType),
  contactMethod: z.nativeEnum(ContactMethodType),
});

export const createRestaurantImagesStepSchema = z.object({
  restaurantId: z.string(),
  profileImage: z
    .union([z.instanceof(File), z.string()])
    .refine((value) => value instanceof File || typeof value === "string", {
      message: "El logo es obligatorio.",
    }),
  backgroundImage: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
});

export const createRestaurantSecondStepSchema = z.object({
  address: z.string().min(1, "La dirección es obligatoria."),
  restaurantId: z.string(),
});

export const createRestaurantThirdStepSchema = z
  .object({
    restaurantId: z.string(),
    name: z.string().min(1, "El nombre del producto es obligatorio."),
    description: z
      .string()
      .min(1, "La descripción del producto es obligatoria."),
    type: z.nativeEnum(ProductType),
    startTime: z.string().min(1, "La hora de inicio es obligatoria."),
    endTime: z.string().min(1, "La hora de finalización es obligatoria."),
    quantity: z.number().min(0, "La cantidad es obligatoria."),
    regularPrice: z.number().min(1, "El precio regular debe ser mayor que 0."),
    currentPrice: z.number().min(1, "El precio actual debe ser mayor que 0."),
  })
  .refine(
    (data) => {
      const start = dayjs(`1970-01-01T${data.startTime}`);
      const end = dayjs(`1970-01-01T${data.endTime}`);
      return start.isBefore(end);
    },
    {
      message:
        "La hora de finalización debe ser posterior a la hora de inicio.",
      path: ["endTime"],
    },
  )
  .refine((data) => data.regularPrice > data.currentPrice, {
    message: "El precio regular debe ser mayor que el precio actual.",
    path: ["regularPrice"],
  });
