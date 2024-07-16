import { PaymentMethodType } from "@prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
  quantity: z.number().min(1, "La cantidad es obligatoria."),
  paymentMethod: z.nativeEnum(PaymentMethodType),
});
