import { auth } from "../auth";
import { prisma } from "../prisma";
import { serializeData } from "./queriesUtils";

const getFavoriteRestaurants = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return [];
  }

  const favoriteRestaurants = await prisma.favoriteRestaurant.findMany({
    where: {
      userId: userId,
    },
    include: {
      restaurant: {
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
      },
    },
  });

  return serializeData(favoriteRestaurants);
};

export { getFavoriteRestaurants };
