import RestaurantsMap from "@/components/templates/RestaurantsMap";
import { getRestaurants } from "@/lib/queries/restaurantQueries";

export default async function Page() {
  const restaurants = await getRestaurants();
  return (
    <div className="h-full">
      <RestaurantsMap restaurants={restaurants} />
    </div>
  );
}
