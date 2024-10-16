import { BUSINESS_TYPE_DISPLAY_TEXT } from "@/constants";
import { pages } from "@/constants/pages";
import { RestaurantWithIsFavoriteAndPartialProduct } from "@/lib/queries/restaurantQueries";
import dayjs from "dayjs";
import { ArrowLeft, Clock, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../atoms/buttons/FavoriteButton";
import ShareButton from "../atoms/buttons/ShareButton";
import StarRating from "../atoms/StarRating";
import ReserveButton from "./ReserveButton";

interface Props {
  restaurant: RestaurantWithIsFavoriteAndPartialProduct;
}

export default function ExpandedRestaurantCard({ restaurant }: Props) {
  const { regularPrice, currentPrice } = restaurant.products[0];

  const formattedStartTime = dayjs(restaurant.startTime).format("HH:mm");
  const formattedEndTime = dayjs(restaurant.endTime).format("HH:mm");

  return (
    <div className="flex h-full flex-col bg-white text-sm">
      <div className="relative h-56 bg-gray-200 sm:h-72 md:h-96">
        <Image
          src={restaurant.backgroundImageUrl || "/default-restaurant-bg.jpg"}
          alt="Imagen de Restaurante"
          layout="fill"
          objectFit="cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <Link
            href={pages.home}
            className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <div className="flex space-x-2">
            <FavoriteButton
              isFavorite={restaurant.isFavorite}
              restaurantId={restaurant.id}
            />
            <ShareButton restaurantName={restaurant.name} />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={restaurant.profileImageUrl || ""}
              alt="Logo del Restaurante"
              width={72}
              height={72}
              className="rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {restaurant.name}
              </h1>
              <p className="text-sm font-medium text-gray-600">
                {BUSINESS_TYPE_DISPLAY_TEXT[restaurant.type]}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-600">
              ${currentPrice.toFixed(2)}
            </span>
            <p className="text-sm text-gray-500 line-through">
              ${regularPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <StarRating stars={5} reviews={255} />
          <div className="flex items-center text-gray-600">
            <Clock className="mr-1 h-4 w-4" />
            Retiro {formattedStartTime} - {formattedEndTime}
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

        <div className="text-gray-700">
          <p className="font-medium">Horario:</p>
          <p>
            {dayjs(restaurant.startTime).format("HH:mm")} -{" "}
            {dayjs(restaurant.endTime).format("HH:mm")}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4 text-green-800 shadow-sm">
          <p className="mb-2 flex items-center text-base font-semibold">
            <Utensils className="mr-2 h-5 w-5" />
            Bolsa Sorpresa
          </p>
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
