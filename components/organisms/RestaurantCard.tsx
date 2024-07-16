import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import { translateProductType } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

const RestaurantCard = async ({
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
      className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={backgroundImageUrl || ""}
          alt="Imagen del Restaurante"
          width={25}
          height={25}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute left-2 top-2 w-full">
          <ItemsLeftBadge itemsLeft={quantity} />
        </div>
        <div className="absolute bottom-2 left-0 flex items-center gap-2 bg-transparent p-2">
          <div className="flex items-center gap-2">
            <Image
              src={profileImageUrl || ""}
              alt="Logo del Restaurante"
              width={25}
              height={25}
              className="h-8 w-8 rounded-full"
            />
            <h3 className="font-semibold text-white">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold">
            {translateProductType("SURPRISE")}
          </h4>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Retiro entre {formattedStartTime} - {formattedEndTime}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <StarIcon className="w-3 fill-primary" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPinIcon className="w-4" />
            <span>{distance} km</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">${regularPrice}</span>
          <span className="text-sm text-gray-500 line-through dark:text-gray-400">
            ${currentPrice}
          </span>
        </div>
      </div>
    </Link>
  );
};

const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default RestaurantCard;
