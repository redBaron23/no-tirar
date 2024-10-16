import { ProductStatus, ProductType } from "@prisma/client";
import { z } from "zod";

// Keep your existing schemas
export const deleteProductSchema = z.object({
  productId: z.string(),
  restaurantId: z.string(),
});

const productBaseSchema = z.object({
  name: z.string().min(1, "El nombre del producto es requerido"),
  description: z.string().nullable().optional(),
  type: z.nativeEnum(ProductType).default(ProductType.SURPRISE),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE),
  category: z.string().nullable().optional(),
  regularPrice: z.number().positive("El precio regular debe ser positivo"),
  currentPrice: z.number().positive("El precio actual debe ser positivo"),
  quantity: z
    .number()
    .int()
    .nonnegative("La cantidad debe ser un número entero no negativo"),
  salesCount: z.number().int().nonnegative().default(0),
  image: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
  restaurantId: z.string(),
});

export const createProductSchema = productBaseSchema.refine(
  (data) => data.regularPrice > data.currentPrice,
  {
    message: "El precio regular debe ser mayor que el precio actual.",
    path: ["regularPrice"],
  },
);

export const updateProductSchema = productBaseSchema
  .extend({
    id: z.string(),
  })
  .partial()
  .required({ id: true })
  .refine(
    (data) => {
      if (data.regularPrice && data.currentPrice) {
        return data.regularPrice > data.currentPrice;
      }
      return true;
    },
    {
      message: "El precio regular debe ser mayor que el precio actual.",
      path: ["regularPrice"],
    },
  );

export const updateProductStatusSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE),
});
