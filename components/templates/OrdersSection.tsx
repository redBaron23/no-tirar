"use client";

import { OrderStatus } from "@prisma/client";
import MiniOrder from "../molecules/MiniOrder";
import OrderSearchBar from "../molecules/OrderSearchBar";

const transactions = [
  {
    id: "x1db-a5k7",
    date: "Hoy 11:55",
    status: OrderStatus.COMPLETED,
    amount: 4653,
  },
  {
    id: "x1db-5k7",
    date: "Hoy 12:00",
    status: OrderStatus.CANCELED,
    amount: 3200,
  },
  {
    id: "x1db-5k7",
    date: "Hoy 12:00",
    status: OrderStatus.IN_PROGRESS,
    amount: 3200,
  },
];

const OrdersSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <OrderSearchBar />
      <h3 className="text-xl font-semibold">Hoy</h3>
      {transactions.map((transaction) => (
        <MiniOrder
          key={transaction.id}
          id={transaction.id}
          date={transaction.date}
          status={transaction.status}
          amount={transaction.amount}
        />
      ))}
    </div>
  );
};

export default OrdersSection;
