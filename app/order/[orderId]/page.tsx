import OrderItemExpanded from "@/components/molecules/order/OrderItemExpanded";
import { getOrderForCurrentUserById } from "@/lib/queries/orderQueries";

interface Props {
  params: { orderId: string };
}

export default async function Page({ params: { orderId } }: Props) {
  const order = await getOrderForCurrentUserById(orderId);

  if (!order) {
    return "No restaurant fund";
  }

  console.log(order);

  return (
    <main className="h-screen">
      <OrderItemExpanded order={order} />
    </main>
  );
}
