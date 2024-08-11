import OrderStatusChip from "@/components/atoms/OrderStatusChip";
import { pages } from "@/constants/pages";
import { OrderWithRestaurantAndProduct } from "@/lib/queries/orderQueries";
import { formatCurrency } from "@/lib/utils";
import { Clock, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderItemCompactProps = {
  order: OrderWithRestaurantAndProduct;
};

const OrderItemCompact = ({ order }: OrderItemCompactProps) => {
  const {
    id,
    status,
    createdAt,
    restaurant,
    totalAmount,
    productQuantity,
    product,
  } = order;
  const formattedDate = new Date(createdAt).toLocaleDateString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate savings (assuming regular price is stored in product)
  const savings =
    ((product.regularPrice as any) - (totalAmount as any)) / productQuantity;
  const savingsPercentage = Math.round(
    (savings / (product.regularPrice as any)) * 100,
  );

  // Simulate time left (replace with actual logic based on your app's rules)
  const timeLeft = "30 min";

  return (
    <Link
      href={`${pages.order}/${id}`}
      className="flex cursor-pointer items-stretch overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative w-1/3 min-w-[120px]">
        <Image
          src={restaurant.profileImageUrl || "/default-restaurant.png"}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <p className="text-xs font-semibold text-white">{restaurant.name}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="mb-2 text-sm text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-600">{timeLeft} restantes</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(totalAmount as any)}
            </p>
            <p className="text-xs text-gray-500 line-through">
              {formatCurrency((product.regularPrice as any) * productQuantity)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-green-600">
              Ahorra {savingsPercentage}%
            </p>
            <OrderStatusChip status={status} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-green-50 px-3">
        <ShoppingBag className="mb-1 text-green-600" size={20} />
        <span className="text-sm font-semibold text-green-600">
          {productQuantity}
        </span>
      </div>
    </Link>
  );
};

export default OrderItemCompact;
