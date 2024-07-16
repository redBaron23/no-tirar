import { pages } from "@/constants/pages";
import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import dayjs from "dayjs";
import {
  ArrowLeft,
  Clock,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../atoms/StarRating";
import ReserveButton from "./ReserveButton";

interface Props {
  restaurant: RestaurantWithPartialProduct;
}

export default function ExpandedRestaurantCard({ restaurant }: Props) {
  const { regularPrice, currentPrice } = restaurant.products[0];

  const contactIcon = {
    PHONE: <Phone className="h-4 w-4" />,
    EMAIL: <Mail className="h-4 w-4" />,
    WHATSAPP: <MessageSquare className="h-4 w-4" />,
  };

  const formattedStartTime = dayjs(restaurant.startTime).format("HH:mm");
  const formattedEndTime = dayjs(restaurant.endTime).format("HH:mm");

  return (
    <div className="flex h-full flex-col bg-white text-sm">
      <div className="relative h-48 bg-gray-200 sm:h-64 md:h-80 lg:h-96">
        <Image
          src={restaurant.backgroundImageUrl || ""}
          alt="Imagen de Restaurante"
          layout="fill"
          objectFit="cover"
          priority
          sizes="100vw"
        />
        <div className="absolute left-2 right-2 top-2 flex items-center justify-between">
          <Link
            href={pages.home}
            className="rounded-full bg-white p-2 shadow-md"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <div className="flex space-x-2">
            <button
              className="rounded-full bg-white p-2 shadow-md"
              aria-label="Favorito"
            >
              <Heart className="h-5 w-5 text-red-500" />
            </button>
            <button
              className="rounded-full bg-white p-2 shadow-md"
              aria-label="Compartir"
            >
              <Share className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={restaurant.profileImageUrl || ""}
              alt="Logo del Restaurante"
              width={64}
              height={64}
              className="rounded-full shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {restaurant.name}
              </h1>
              <p className="text-sm font-medium text-gray-600">
                {restaurant.type}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-600">
              ${currentPrice}
            </span>
            <p className="text-sm text-gray-500 line-through">
              ${regularPrice}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <StarRating stars={5} reviews={255} />
          <div className="flex items-center text-gray-600">
            <Clock className="mr-1 h-4 w-4" />
            Retiro entre {formattedStartTime} - {formattedEndTime}
          </div>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            Hoy
          </span>
          <div className="flex items-center text-gray-600">
            <MapPin className="mr-1 h-4 w-4" />
            <span>2.5km away</span>
          </div>
        </div>

        {restaurant.description && (
          <p className="text-sm text-gray-700">{restaurant.description}</p>
        )}

        <div className="flex items-center space-x-2 text-gray-700">
          <span className="font-medium">Contacto preferido:</span>
          {contactIcon[restaurant.contactMethod]}
          <span>{restaurant.phone}</span>
        </div>

        <div className="text-gray-700">
          <p className="font-medium">Horario:</p>
          <p>
            {restaurant.startTime?.toLocaleTimeString()} -{" "}
            {restaurant.endTime?.toLocaleTimeString()}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4 text-green-800 shadow-sm">
          <p className="mb-2 text-base font-semibold">Qué podrías obtener</p>
          <p className="text-sm">
            ¡Es una sorpresa! Cuando comprás una Bolsa Sorpresa, estará llena de
            la deliciosa comida que le quedó al local al final del día.
          </p>
        </div>

        <ReserveButton restaurant={restaurant} />

        <div className="mt-4 text-center">
          <Link href="#" className="text-sm text-green-600 hover:underline">
            Más información sobre el restaurante
          </Link>
        </div>
      </div>
    </div>
  );
}
