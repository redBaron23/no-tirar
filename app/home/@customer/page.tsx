import RestaurantCardList from "@/components/organisms/RestaurantCardList";
import generateRestaurants from "@/constants/mockData";

const restaurants = generateRestaurants(15);

export default function Page() {
  return <RestaurantCardList restaurants={restaurants} />;
}
