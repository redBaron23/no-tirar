"use client";

import OrderStatusChip from "@/components/atoms/OrderStatusChip";
import { OrderWithRestaurantAndProduct } from "@/lib/queries/orderQueries";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type OrderItemCompactProps = {
  order: OrderWithRestaurantAndProduct;
  onClick: () => void;
};

const OrderItemCompact = ({ order, onClick }: OrderItemCompactProps) => {
  const { status, createdAt, restaurant, totalAmount, productQuantity } = order;
  const formattedDate = new Date(createdAt).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between border-b border-gray-200 bg-white p-4 hover:bg-gray-50"
    >
      <div className="flex items-center space-x-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={restaurant.profileImageUrl || "/default-restaurant.png"}
            alt={restaurant.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{restaurant.name}</h3>
          <p className="text-sm text-gray-500">
            {formattedDate} • {productQuantity} producto
            {productQuantity > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <OrderStatusChip status={status} />
        <p className="font-semibold">{formatCurrency(totalAmount)}</p>
        <ChevronRight className="text-gray-400" />
      </div>
    </div>
  );
};

export default OrderItemCompact;
