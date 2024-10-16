import { Order, Product, Restaurant, User } from "@prisma/client";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { serializeData } from "./queriesUtils";
import { getRestaurant } from "./restaurantQueries";

export type OrderWithUserAndProduct = Order & {
  product: Product;
  user: User;
};

export type OrderWithRestaurantAndProduct = Order & {
  product: Product;
  restaurant: Restaurant;
};

// @todo optimize and select just necessary attributes
const getOrdersForCurrentRestaurant = async (): Promise<
  OrderWithUserAndProduct[]
> => {
  const restaurant = await getRestaurant();

  if (!restaurant) {
    return [];
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

const getOrdersForCurrentUser = async (): Promise<
  OrderWithRestaurantAndProduct[]
> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return [];
  }

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
      restaurant: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return serializeData(orders);
};

const getOrderForCurrentUserById = async (
  id: string,
): Promise<OrderWithRestaurantAndProduct | null> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  const orders = await prisma.order.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      product: true,
      restaurant: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return serializeData(orders);
};

export {
  getOrderForCurrentUserById,
  getOrdersForCurrentRestaurant,
  getOrdersForCurrentUser,
};
