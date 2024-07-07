import CompleteRestaurant from "@/components/templates/CompleteRestaurant";
import { getRestaurant } from "@/lib/queries/restaurantQueries";

export default async function Page() {
  const restaurant = await getRestaurant();

  return (
    <div className="p-5">
      <CompleteRestaurant restaurant={restaurant} />
    </div>
  );
}
