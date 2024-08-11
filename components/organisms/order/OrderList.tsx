import OrderItemCompact from "@/components/molecules/order/OrderItem";
import { APP_NAME } from "@/constants";
import { OrderWithRestaurantAndProduct } from "@/lib/queries/orderQueries";
import { ShoppingBag } from "lucide-react";

interface Props {
  orders: OrderWithRestaurantAndProduct[];
}

export function OrderList({ orders }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <ShoppingBag className="mx-auto h-12 w-12 text-teal-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Aún no tienes pedidos
          </h2>
          <p className="mt-2 text-gray-600">
            ¡Comienza a usar {APP_NAME} para ver tus pedidos aquí!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderItemCompact key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
