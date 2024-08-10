import { Restaurant } from "@prisma/client";
import Image from "next/image";

interface RestaurantInfoCardProps {
  restaurant: Restaurant;
  distance: number;
}

const RestaurantInfoCard = ({
  restaurant,
  distance,
}: RestaurantInfoCardProps) => {
  return (
    <div className="max-h-30 flex w-full max-w-sm rounded-lg bg-white p-4 shadow-md">
      <div className="relative mr-4 w-1/3">
        <Image
          src={restaurant.profileImageUrl || "/placeholder-image.jpg"}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="w-2/3">
        <h2 className="mb-2 text-xl font-semibold">{restaurant.name}</h2>
        <p className="mb-2 text-gray-600">
          Open: {restaurant.startTime?.toISOString()}
        </p>
        <p className="mb-2 text-gray-600">
          Cierre: {restaurant.endTime?.toISOString()}
        </p>
        <p className="text-gray-600">Distance: {distance.toFixed(2)} meters</p>
      </div>
    </div>
  );
};

export default RestaurantInfoCard;
