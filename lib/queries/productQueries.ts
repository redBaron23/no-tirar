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

const getSurpriseProduct = async (restaurantId: string) => {
  const product = await prisma.product.findFirst({
    where: {
      restaurantId,
      type: "SURPRISE",
    },
  });

  return serializeData(product);
};

export { getProducts, getSurpriseProduct };
