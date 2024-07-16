import { Restaurant } from "@prisma/client";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { serializeData } from "./queriesUtils";

type ProductSelection = {
  id: string;
  quantity: number;
  currentPrice: number;
  regularPrice: number;
};

export type RestaurantWithPartialProduct = Omit<Restaurant, "products"> & {
  products: ProductSelection[];
};

const getRestaurant = async () => {
  const session = await auth();
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  return restaurant;
};

const getRestaurantWithSurprise = async (restaurantId: string) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: restaurantId,
    },
    include: {
      products: {
        where: {
          type: "SURPRISE",
        },
        select: {
          id: true,
          quantity: true,
          currentPrice: true,
          regularPrice: true,
        },
        take: 1,
      },
    },
  });

  return serializeData(restaurant);
};

const getRestaurantsWithSurprise = async () => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      products: {
        where: {
          type: "SURPRISE",
        },
        select: {
          id: true,
          quantity: true,
          currentPrice: true,
          regularPrice: true,
        },
        take: 1,
      },
    },
  });

  return serializeData(restaurants);
};

export { getRestaurant, getRestaurantsWithSurprise, getRestaurantWithSurprise };
