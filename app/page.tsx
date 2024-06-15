import RestaurantCardList from "../components/organisms/RestaurantCardList";
import generateRestaurants from "../constants/mockData";

const restaurants = generateRestaurants(10);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        <RestaurantCardList restaurants={restaurants} />
      </div>
    </main>
  );
}
