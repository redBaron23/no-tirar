// molecules/OrderItem.tsx
import OrderStatusChip from "@/components/atoms/OrderStatusChip";
import PaymentMethod from "@/components/atoms/PaymentMethod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus, PaymentMethodType } from "@prisma/client";

type OrderItemProps = {
  id: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethodType;
  createdAt: string | Date;
};

export function OrderItem({
  id,
  productName,
  quantity,
  totalAmount,
  status,
  paymentMethod,
  createdAt,
}: OrderItemProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order #{id.slice(0, 8)}</span>
          <OrderStatusChip status={status} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">{productName}</span>
          <span>Quantity: {quantity}</span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span>Total: ${totalAmount.toFixed(2)}</span>
          <PaymentMethod method={paymentMethod} />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">{formattedDate}</span>;
        </div>
      </CardContent>
    </Card>
  );
}
