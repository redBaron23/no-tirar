import { prisma } from "../prisma";
import { serializeData } from "./queriesUtils";

const getProducts = async (restaurantId: string) => {
  const products = await prisma.product.findMany({
    where: {
      restaurantId,
    },
  });

  return serializeData(products);
};

export { getProducts };
