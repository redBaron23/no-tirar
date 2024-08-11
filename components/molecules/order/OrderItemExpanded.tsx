import OrderStatusChip from "@/components/atoms/OrderStatusChip";
import PaymentMethod from "@/components/atoms/PaymentMethod";
import StarRating from "@/components/atoms/StarRating";
import { BUSINESS_TYPE_DISPLAY_TEXT } from "@/constants";
import { pages } from "@/constants/pages";
import { OrderWithRestaurantAndProduct } from "@/lib/queries/orderQueries";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { ArrowLeft, Clock, MapPin, Phone, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderItemExpandedProps = {
  order: OrderWithRestaurantAndProduct;
};

const OrderItemExpanded = ({ order }: OrderItemExpandedProps) => {
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
    <div className="flex min-h-screen flex-col bg-white">
      <div className="relative h-56 bg-gray-200 sm:h-72">
        <Image
          src={restaurant?.backgroundImageUrl || "/default-restaurant-bg.jpg"}
          alt="Imagen de Restaurante"
          layout="fill"
          objectFit="cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <Link
            href={pages.order}
            className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
        </div>
      </div>

      <div className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center space-x-4">
            <Image
              src={restaurant?.profileImageUrl || ""}
              alt="Logo del Restaurante"
              width={64}
              height={64}
              className="rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {restaurant?.name}
              </h1>
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
              {formatCurrency(totalAmount as any)}
            </p>
            <p className="mt-1 text-sm text-gray-600">{formattedDate}</p>
          </div>

          <div className="mb-4">
            <h2 className="mb-2 text-lg font-semibold">
              Detalles del restaurante
            </h2>
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
            <h2 className="mb-2 text-lg font-semibold">Método de pago</h2>
            <PaymentMethod method={paymentMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemExpanded;
