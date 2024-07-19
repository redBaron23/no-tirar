import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import RestaurantCard from "./RestaurantCard";

interface RestaurantCardListProps {
  restaurants: RestaurantWithPartialProduct[];
}

const RestaurantCardList = ({ restaurants }: RestaurantCardListProps) => {
  if (restaurants.length) {
    return "No hay restaurants carga2";
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantCardList;
