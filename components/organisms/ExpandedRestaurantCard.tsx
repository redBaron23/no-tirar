import React from "react";
import { pages } from "@/constants/pages";
import { RestaurantType } from "@/lib/validations/RestaurantValidation";
import Image from "next/image";
import Link from "next/link";
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
            <HeartIcon className="h-6 w-6 text-red-500" />
          </div>
          <div className="rounded-full bg-white p-1">
            <ShareIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="absolute left-2 top-2 flex space-x-2">
          <Link href={pages.discover} className="rounded-full bg-white p-1">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
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
            <div className="align-center flex gap-2 text-gray-500">
              <ClockIcon className="inline-block h-4 w-4" />
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

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function LocateIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
