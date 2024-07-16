import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import RestaurantCard from "./RestaurantCard";

interface RestaurantCardListProps {
  restaurants: RestaurantWithPartialProduct[];
}

const RestaurantCardList = ({ restaurants }: RestaurantCardListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantCardList;
