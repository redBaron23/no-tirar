import DaySelect from "@/components/molecules/DaySelect";
import OrdersSection from "@/components/templates/OrdersSection";
import { getOrders } from "@/lib/queries/orderQueries";

export default async function Page() {
  const orders = await getOrders();

  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-4 md:container">
      <h1 className="text-3xl font-semibold leading-tight text-gray-800">
        Historial de Pedidos
      </h1>
      <DaySelect />
      <OrdersSection orders={orders} />
    </div>
  );
}
