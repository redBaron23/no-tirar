import { pages } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Restaurant {
  id: number;
  imageUrl: string;
  name: string;
  logo: string;
  bagName: string;
  rating: number;
  pickupTime: string;
  distance: number;
  price: number;
  originalPrice: number;
  itemsLeft: number;
}

interface Props {
  restaurant: Restaurant;
}

export default function Component({ restaurant }: Props) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
      <div className="relative flex-grow" style={{ height: "300px" }}>
        <Image
          src={restaurant.imageUrl}
          alt="Food Image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <div className="bg-white rounded-full p-1">
            <HeartIcon className="w-6 h-6 text-red-500" />
          </div>
          <div className="bg-white rounded-full p-1">
            <ShareIcon className="w-6 h-6 text-gray-500" />
          </div>
        </div>
        <div className="absolute top-2 left-2 flex space-x-2">
          <Link href={pages.index} className="bg-white rounded-full p-1">
            <ArrowLeftIcon className="w-6 h-6 text-gray-500" />
          </Link>
        </div>
        <div className="absolute bottom-2 left-2 flex flex-col">
          <div className="bg-yellow-300 w-1/2 rounded-full py-1 text-center text-sm font-semibold">
            {restaurant.itemsLeft} left
          </div>
          <div className="flex flex-row items-center p-2 rounded-lg bg-transparent">
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
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {restaurant.bagName}
          </div>
        </div>
        <div className="text-gray-500 mb-2">
          €{restaurant.price.toFixed(2)}{" "}
          <span className="line-through">
            €{restaurant.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="text-gray-500 mb-4">
          <ClockIcon className="w-4 h-4 inline-block mr-1" />
          Pick up: {restaurant.pickupTime} (Today)
        </div>
        <div className="text-gray-500 mb-4">
          <LocateIcon className="w-4 h-4 inline-block mr-1" />
          Distance: {restaurant.distance} km
          <span className="text-blue-500 cursor-pointer">
            More information about the store
          </span>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          <p className="font-semibold mb-2">What you could get</p>
          <p>
            It's a surprise! When you buy a Surprise Bag, it will be filled with
            the delicious food that the store has left at the end of the day.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Meals</p>
          <p className="text-blue-500 cursor-pointer">
            Ingredients & allergens
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-green-500 mr-1" />
            <span className="text-sm font-semibold">
              {restaurant.rating} / 5.0
            </span>
          </div>
          <span className="text-gray-500 text-sm cursor-pointer">
            Top 3 highlights
          </span>
        </div>
        <div className="mt-auto p-4">
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold">
            Reserve
          </button>
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
