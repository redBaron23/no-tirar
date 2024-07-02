import { Product, Restaurant } from "@prisma/client";

export interface EstablishmentForm
  extends Omit<Restaurant, "createdAt" | "updatedAt"> {
  profileImage: File | null;
  backgroundImage: File | null;
}
