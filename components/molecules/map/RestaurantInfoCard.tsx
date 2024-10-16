import { pages } from "@/constants/pages";
import { Restaurant } from "@prisma/client";
import { Navigation2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RestaurantInfoCardProps {
  restaurant: Restaurant;
  distance: number | null;
}

const RestaurantInfoCard = ({
  restaurant,
  distance,
}: RestaurantInfoCardProps) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;

  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-md">
      <Link
        href={`${pages.restaurant}/${restaurant.id}`}
        className="relative mr-3 h-14 w-14 flex-shrink-0"
      >
        <Image
          src={restaurant.profileImageUrl || "/placeholder-image.jpg"}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </Link>

      <Link
        href={`${pages.restaurant}/${restaurant.id}`}
        className="mr-2 flex-grow"
      >
        <h2 className="mb-1 truncate text-lg font-semibold text-black">
          {restaurant.name}
        </h2>
        <div className="flex flex-col text-sm text-gray-600">
          {distance && <p>Distance: {distance.toFixed(0)} m</p>}
          <p>
            Open:{" "}
            {restaurant.startTime?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {restaurant.endTime?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </Link>

      <Link
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <Navigation2
          className="text-blue-500 transition-colors hover:text-blue-600"
          size={24}
        />
      </Link>
    </div>
  );
};

export default RestaurantInfoCard;
