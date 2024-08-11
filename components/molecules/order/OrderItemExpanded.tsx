import OrderStatusChip from "@/components/atoms/OrderStatusChip";
import PaymentMethod from "@/components/atoms/PaymentMethod";
import StarRating from "@/components/atoms/StarRating";
import { BUSINESS_TYPE_DISPLAY_TEXT } from "@/constants";
import { OrderWithRestaurantAndProduct } from "@/lib/queries/orderQueries";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { Clock, MapPin, Phone, Utensils, X } from "lucide-react";
import Image from "next/image";

type OrderItemExpandedProps = {
  order: OrderWithRestaurantAndProduct;
  onClose: () => void;
};

const OrderItemExpanded = ({ order, onClose }: OrderItemExpandedProps) => {
  const {
    status,
    createdAt,
    restaurant,
    totalAmount,
    productQuantity,
    product,
    paymentMethod,
  } = order;

  const formattedDate = dayjs(createdAt).format(
    "dddd, D [de] MMMM [de] YYYY, HH:mm",
  );
  const formattedStartTime = dayjs(restaurant?.startTime).format("HH:mm");
  const formattedEndTime = dayjs(restaurant?.endTime).format("HH:mm");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="relative h-48 bg-gray-200">
          <Image
            src={restaurant?.backgroundImageUrl || "/default-restaurant-bg.jpg"}
            alt="Imagen de Restaurante"
            layout="fill"
            objectFit="cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center space-x-4">
            <Image
              src={restaurant?.profileImageUrl || ""}
              alt="Logo del Restaurante"
              width={64}
              height={64}
              className="rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {restaurant?.name}
              </h2>
              <p className="text-sm font-medium text-gray-600">
                {BUSINESS_TYPE_DISPLAY_TEXT[restaurant?.type]}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
            <OrderStatusChip status={status} />
            <StarRating stars={5} reviews={255} />
            <div className="flex items-center text-gray-600">
              <Clock className="mr-1 h-4 w-4" />
              Retiro {formattedStartTime} - {formattedEndTime}
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800 shadow-sm">
            <p className="mb-2 flex items-center text-base font-semibold">
              <Utensils className="mr-2 h-5 w-5" />
              Detalles del Pedido
            </p>
            <p className="font-medium">{product?.name}</p>
            <p className="text-sm">Cantidad: {productQuantity}</p>
            <p className="mt-2 text-lg font-bold">
              {formatCurrency(totalAmount)}
            </p>
            <p className="mt-1 text-sm text-gray-600">{formattedDate}</p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Detalles del restaurante</h3>
            <p className="mb-1 flex items-center text-gray-600">
              <MapPin size={16} className="mr-2" />
              {restaurant?.address}
            </p>
            {restaurant?.phone && (
              <p className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                {restaurant?.phone}
              </p>
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2 font-semibold">Método de pago:</p>
            <PaymentMethod method={paymentMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemExpanded;
