import { RestaurantType } from "@/lib/validations/RestaurantValidation";
import { pages } from "../../constants/pages";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemsLeftBadge from "../atoms/ItemsLeftBadge";

interface Props {
  restaurant: RestaurantType;
}

const RestaurantCard = ({
  restaurant: {
    id,
    imageUrl,
    name,
    logo,
    bagName,
    rating,
    pickupTime,
    distance,
    price,
    originalPrice,
    itemsLeft,
  },
}: Props) => {
  return (
    <Link
      href={`${pages.restaurant}/${id}`}
      className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt="Restaurant Image"
          width={25}
          height={25}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute left-2 top-2 w-full">
          <ItemsLeftBadge itemsLeft={itemsLeft} />
        </div>
        <div className="absolute bottom-2 left-0 flex items-center gap-2 bg-transparent p-2">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Restaurant Logo"
              width={25}
              height={25}
              className="h-8 w-8 rounded-full"
            />
            <h3 className="text-base font-semibold">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold">{bagName}</h4>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Pickup between {pickupTime}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <StarIcon className="fill-primary w-3" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPinIcon className="w-4" />
            <span>{distance} km</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">${price}</span>
          <span className="text-sm text-gray-500 line-through dark:text-gray-400">
            ${originalPrice}
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
