import { PAYMENT_OPTIONS } from "@/constants";
import { OrderWithUserAndProduct } from "@/lib/queries/orderQueries";
import { translateProductType } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FaCalendar, FaShoppingBag, FaTag, FaUser } from "react-icons/fa";
import OrderStatusChip from "../atoms/OrderStatusChip";

dayjs.extend(utc);

interface Props {
  order: OrderWithUserAndProduct;
}

const MiniOrder = ({ order }: Props) => {
  const {
    status,
    createdAt,
    id,
    totalAmount,
    product,
    user,
    productQuantity,
    paymentMethod,
  } = order;

  const paymentOption = PAYMENT_OPTIONS.find(
    (option) => option.key === paymentMethod,
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <span className="font-mono text-lg font-semibold text-green-600">
          #{id.slice(-5)}
        </span>
        <OrderStatusChip status={status} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OrderDetail
          icon={FaCalendar}
          label="Fecha"
          value={dayjs.utc(createdAt).format("DD MMM YYYY, HH:mm")}
        />
        <OrderDetail icon={FaUser} label="Cliente" value={user.name} />
        <OrderDetail
          icon={FaShoppingBag}
          label="Producto"
          value={product.name}
        />
        <OrderDetail
          icon={FaTag}
          label="Tipo"
          value={translateProductType(product.type)}
        />
        <OrderDetail
          icon={FaShoppingBag}
          label="Cantidad"
          value={productQuantity.toString()}
        />
        <OrderDetail
          icon={paymentOption?.icon}
          label="Método de Pago"
          value={paymentOption?.value}
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-sm font-medium text-gray-500">Monto Total</span>
        <span className="text-2xl font-bold text-green-600">
          ${totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

const OrderDetail = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center space-x-3">
    <Icon className="text-green-500" />
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  </div>
);

export default MiniOrder;
