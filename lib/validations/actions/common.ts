import { z } from "zod";

export const RestaurantIdSchema = z.string().uuid();
