import { Order, Product, User } from "@prisma/client";
import { prisma } from "../prisma";
import { serializeData } from "./queriesUtils";
import { getRestaurant } from "./restaurantQueries";

export type OrderWithUserAndProduct = Order & {
  product: Product;
  user: User;
};

// @todo optimize and select just necessary attributes
const getOrders = async (): Promise<OrderWithUserAndProduct[]> => {
  const restaurant = await getRestaurant();
  if (!restaurant) {
    return []
  }

  const orders = await prisma.order.findMany({
    where: {
      restaurantId: restaurant.id,
    },
    include: {
      product: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return serializeData(orders);
};

export { getOrders };
