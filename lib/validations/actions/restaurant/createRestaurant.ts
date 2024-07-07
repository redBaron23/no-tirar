import { BusinessType, ContactMethodType, ProductType } from "@prisma/client";
import { z } from "zod";

export const createRestaurantFirstStepSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  phone: z.string().min(1, "El telefono es obligatorio"),
  type: z.nativeEnum(BusinessType),
  contactMethod: z.nativeEnum(ContactMethodType),
});

export const createRestaurantSecondStepSchema = z.object({
  address: z.string().min(1, "La direccion es obligatoria"),
  restaurantId: z.string(),
});

export const createRestaurantThirdStepSchema = z.object({
  restaurantId: z.string(),
  // profileImage: z.instanceof(File).nullable().optional(),
  // backgroundImage: z.instanceof(File).nullable().optional(),
  productType: z.nativeEnum(ProductType),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be a positive number"),
});

// .refine(
//   (data) => {
//     const start = dayjs(`1970-01-01T${data.startTime}`);
//     const end = dayjs(`1970-01-01T${data.endTime}`);
//     return start.isBefore(end);
//   },
//   {
//     message: "La hora de finalización debe ser posterior a la hora de inicio",
//     path: ["endTime"],
//   },
// );
