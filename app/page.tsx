import RestaurantCardList from "../components/templates/RestaurantCardList";
import generateRestaurants from "../constants/mockData";

const restaurants = generateRestaurants(10);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-3xl font-bold">Restaurants</h1>
        <RestaurantCardList restaurants={restaurants} />
      </div>
    </div>
  );
}
