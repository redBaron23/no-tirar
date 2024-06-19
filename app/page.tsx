import RestaurantCardList from "../components/templates/RestaurantCardList";
import generateRestaurants from "../constants/mockData";

const restaurants = generateRestaurants(10);

export default function Home() {
  return (
    <div>
      <RestaurantCardList restaurants={restaurants} />
    </div>
  );
}
