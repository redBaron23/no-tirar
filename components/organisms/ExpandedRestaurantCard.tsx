import React from "react";
import { pages } from "@/constants/pages";
import { RestaurantType } from "@/lib/validations/RestaurantValidation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiHeart, FiShare, FiClock } from "react-icons/fi";
import ItemsLeftBadge from "../atoms/ItemsLeftBadge";
import PriceDisplay from "../atoms/PriceDisplay";
import Divider from "../atoms/Divider";
import StarRating from "../atoms/StarRating";
import Location from "../molecules/Location";
import ReserveButton from "./ReserveButton";

interface Props {
  restaurant: RestaurantType;
}

export default function Component({ restaurant }: Props) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white">
      <div className="relative flex-grow" style={{ height: "300px" }}>
        <Image
          src={restaurant.imageUrl}
          alt="Food Image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute right-2 top-2 flex space-x-2">
          <div className="rounded-full bg-white p-1">
            <FiHeart className="h-6 w-6 text-red-500" />
          </div>
          <div className="rounded-full bg-white p-1">
            <FiShare className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="absolute left-2 top-2 flex space-x-2">
          <Link href={pages.discover} className="rounded-full bg-white p-1">
            <FiArrowLeft className="h-6 w-6 text-gray-500" />
          </Link>
        </div>
        <div className="absolute bottom-4 left-2 flex flex-col gap-2">
          <ItemsLeftBadge itemsLeft={restaurant.itemsLeft} />
          <div className="flex flex-row items-center rounded-lg bg-transparent p-2">
            <div className="relative h-24 w-24">
              <Image
                src={restaurant.logo}
                alt="Restaurant Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <h1 className="ml-2 text-4xl font-semibold text-white md:text-6xl">
              {restaurant.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <div className="flex items-center justify-between px-4">
          <div className="mb-2 flex flex-col gap-2">
            <span className="w-28 rounded-full bg-green-100 px-2 py-1 text-center text-xs font-semibold text-green-800">
              {restaurant.bagName}
            </span>
            <StarRating stars={restaurant.stars} reviews={restaurant.reviews} />
            <div className="flex items-center gap-2 text-base text-gray-500">
              <FiClock />
              Pick up: {restaurant.pickupTime}
            </div>
            <span className="w-16 rounded-full bg-green-100 text-center text-xs font-semibold text-green-800">
              Today
            </span>
          </div>
          <PriceDisplay
            originalPrice={restaurant.originalPrice}
            price={restaurant.price}
          />
        </div>
        <Divider className="mt-2" />
        <Location />
        <Divider />
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
          <p className="mb-2 font-semibold">What you could get</p>
          <p>
            Its a surprise! When you buy a Surprise Bag, it will be filled with
            the delicious food that the store has left at the end of the day.
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center p-4">
          <ReserveButton restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
}
