import { Product, Restaurant } from "@prisma/client";

export type EstablishmentForm = Omit<Product, "createdAt" | "updatedAt"> &
  Omit<Restaurant, "createdAt" | "updatedAt"> & {
    profileImage: File | null;
    backgroundImage: File | null;
  };
