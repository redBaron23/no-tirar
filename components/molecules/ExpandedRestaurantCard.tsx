import React from "react";
import { pages } from "@/constants/pages";
import { RestaurantType } from "@/lib/validations/RestaurantValidation";
import Image from "next/image";
import Link from "next/link";
import Counter from "./Counter";

interface Props {
  restaurant: RestaurantType;
}

export default function Component({ restaurant }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white">
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
          <Link href={pages.index} className="rounded-full bg-white p-1">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </Link>
        </div>
        <div className="absolute bottom-2 left-2 flex flex-col">
          <div className="w-1/2 rounded-full bg-yellow-300 py-1 text-center text-sm font-semibold">
            {restaurant.itemsLeft} left
          </div>
          <div className="flex flex-row items-center rounded-lg bg-transparent p-2">
            <Image
              src={restaurant.logo}
              alt="Restaurant Logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="ml-2 font-semibold text-white">
              {restaurant.name}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
            {restaurant.bagName}
          </div>
        </div>
        <div className="mb-2 text-gray-500">
          €{restaurant.price.toFixed(2)}{" "}
          <span className="line-through">
            €{restaurant.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="mb-4 text-gray-500">
          <ClockIcon className="mr-1 inline-block h-4 w-4" />
          Pick up: {restaurant.pickupTime} (Today)
        </div>
        <div className="mb-4 text-gray-500">
          <LocateIcon className="mr-1 inline-block h-4 w-4" />
          Distance: {restaurant.distance} km
          <span className="cursor-pointer text-blue-500">
            More information about the store
          </span>
        </div>
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
          <p className="mb-2 font-semibold">What you could get</p>
          <p>
            Its a surprise! When you buy a Surprise Bag, it will be filled with
            the delicious food that the store has left at the end of the day.
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold">Meals</p>
          <p className="cursor-pointer text-blue-500">
            Ingredients & allergens
          </p>
        </div>
        <div className="mt-auto flex flex-col items-center">
          <Counter maxQuantity={10} />
          <div className="mt-4 w-full p-4">
            <button className="w-full rounded-lg bg-green-500 py-3 font-semibold text-white">
              Reserve
            </button>
          </div>
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

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
}
