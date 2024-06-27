import { OrderStatus } from "@prisma/client";
import OrderStatusChip from "../atoms/OrderStatusChip";

interface MiniOrderProps {
  id: string;
  date: string;
  status: OrderStatus;
  amount: number | string;
}

const MiniOrder: React.FC<MiniOrderProps> = ({ id, date, status, amount }) => {
  const formattedAmount =
    typeof amount === "number"
      ? amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
      : `$${amount}`;

  return (
    <div className="grid grid-cols-2 gap-4 border border-gray-200 p-4">
      <div className="flex flex-col justify-center">
        <span className="font-mono text-lg">{id}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div className="flex flex-col items-end justify-center">
        <OrderStatusChip status={status} />
        <span className="text-xl font-semibold">{formattedAmount}</span>
      </div>
    </div>
  );
};

export default MiniOrder;
