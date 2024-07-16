import RestaurantCardList from "@/components/organisms/RestaurantCardList";
import { getRestaurantsWithSurprise } from "@/lib/queries/restaurantQueries";

export default async function Page() {
  const restaurants = await getRestaurantsWithSurprise();

  return <RestaurantCardList restaurants={restaurants} />;
}
