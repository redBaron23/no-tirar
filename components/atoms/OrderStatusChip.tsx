import { OrderStatus } from "@prisma/client";

interface Props {
  status: OrderStatus;
}

const statusStyles: { [key in OrderStatus]: string } = {
  PENDING: "bg-blue-50 text-blue-600",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  CANCELED: "bg-red-100 text-red-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const statusText: { [key in OrderStatus]: string } = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  REJECTED: "Rechazado por el local",
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
