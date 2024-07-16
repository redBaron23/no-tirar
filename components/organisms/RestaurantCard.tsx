import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import { translateProductType } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { pages } from "../../constants/pages";
import ItemsLeftBadge from "../atoms/ItemsLeftBadge";

const rating = parseFloat(
  faker.number.float({ min: 4, max: 5, precision: 0.1 }).toFixed(1),
);

const distance = parseFloat(
  faker.number.float({ min: 1, max: 3, precision: 0.1 }).toFixed(1),
);

interface Props {
  restaurant: RestaurantWithPartialProduct;
}

const RestaurantCard = ({
  restaurant: {
    id,
    profileImageUrl,
    name,
    backgroundImageUrl,
    products,
    startTime,
    endTime,
  },
}: Props) => {
  const { regularPrice, currentPrice, quantity } = products[0];

  const formattedStartTime = dayjs(startTime).format("HH:mm");
  const formattedEndTime = dayjs(endTime).format("HH:mm");

  return (
    <Link
      href={`${pages.restaurant}/${id}`}
      className="relative flex h-full min-w-[300px] flex-col overflow-hidden rounded-lg bg-white shadow transition-transform duration-300 hover:scale-105 dark:bg-gray-800"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={backgroundImageUrl || ""}
          alt="Imagen del Restaurante"
          fill
          className="object-cover object-center"
        />
        <div className="absolute left-2 top-2 w-full">
          <ItemsLeftBadge itemsLeft={quantity} />
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-transparent p-2">
          <Image
            src={profileImageUrl || ""}
            alt="Logo del Restaurante"
            width={44}
            height={44}
            className="rounded-full"
          />
          <h3 className="text-lg font-semibold text-white drop-shadow-md">
            {name}
          </h3>
        </div>
      </div>
      <div className="flex-grow p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold">
            {translateProductType("SURPRISE")}
          </h4>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Retiro entre {formattedStartTime} - {formattedEndTime}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-gray-200 p-3 dark:border-gray-700">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div
            className="flex items-center gap-1"
            aria-label={`Rating: ${rating} stars`}
          >
            <Star className="h-4 w-4 fill-green-500 text-green-500" />
            <span className="text-sm">{rating}</span>
          </div>
          <div
            className="flex items-center gap-1 whitespace-nowrap"
            aria-label={`Distance: ${distance} km`}
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{distance} km</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 line-through dark:text-gray-400">
            ${regularPrice}
          </span>
          <span className="text-lg font-semibold text-green-600">
            ${currentPrice}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
