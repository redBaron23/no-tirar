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

export type RestaurantWithIsFavoriteAndPartialProduct = Omit<
  Restaurant,
  "products"
> & {
  products: ProductSelection[];
  isFavorite: boolean;
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

const getRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();

  return restaurants;
};

const getRestaurantWithSurprise = async (
  restaurantId: string,
): Promise<RestaurantWithIsFavoriteAndPartialProduct | null> => {
  const session = await auth();
  const userId = session?.user?.id;

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
      ...(userId
        ? {
            favoritedBy: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              },
            },
          }
        : {}),
    },
  });

  if (!restaurant) {
    return null;
  }

  return serializeData({
    ...restaurant,
    isFavorite: restaurant.favoritedBy.length > 0,
  });
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

export {
  getRestaurant,
  getRestaurants,
  getRestaurantsWithSurprise,
  getRestaurantWithSurprise,
};
