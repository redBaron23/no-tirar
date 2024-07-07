import { Restaurant } from "@prisma/client";
import { auth } from "../auth";
import { prisma } from "../prisma";

const getRestaurant = async () => {
  const session = await auth();
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  return restaurant as Restaurant;
};

export { getRestaurant };
