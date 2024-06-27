import { OrderStatus } from "@prisma/client";

interface Props {
  status: OrderStatus;
}

const statusStyles: { [key in OrderStatus]: string } = {
  IN_PROGRESS: "bg-blue-100 text-blue-500",
  CANCELED: "bg-red-100 text-red-500",
  COMPLETED: "bg-green-100 text-green-500",
};

const statusText: { [key in OrderStatus]: string } = {
  IN_PROGRESS: "En progreso",
  CANCELED: "Cancelado",
  COMPLETED: "Completado",
};

const OrderStatusChip = ({ status }: Props) => {
  return (
    <span className={`rounded px-2 py-1 uppercase ${statusStyles[status]}`}>
      {statusText[status]}
    </span>
  );
};

export default OrderStatusChip;
