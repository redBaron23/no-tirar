import { getPaymentMethod } from "@/lib/utils";
import { PaymentMethodType } from "@prisma/client";

type PaymentMethodProps = {
  method: PaymentMethodType;
};

function PaymentMethod({ method }: PaymentMethodProps) {
  const Icon = getPaymentMethod(method)?.icon as any;

  return (
    <div className="flex items-center">
      <Icon className="mr-2" />
      <span>{method}</span>
    </div>
  );
}

export default PaymentMethod;
