import { prisma } from "../prisma";

const getProducts = async (restaurantId: string) => {
  const restaurant = await prisma.product.findMany({
    where: {
      restaurantId,
    },
  });

  return restaurant;
};

export { getProducts };
