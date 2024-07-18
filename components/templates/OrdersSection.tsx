"use client";

import { OrderWithUserAndProduct } from "@/lib/queries/orderQueries";
import MiniOrder from "../molecules/MiniOrder";
import OrderSearchBar from "../molecules/OrderSearchBar";

interface Props {
  orders: OrderWithUserAndProduct[];
}

const OrdersSection = ({ orders }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <OrderSearchBar />
      <h3 className="text-xl font-semibold">Hoy</h3>
      {orders.map((order: OrderWithUserAndProduct) => (
        <MiniOrder key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersSection;
