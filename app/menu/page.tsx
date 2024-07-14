import CompleteRestaurant from "@/components/templates/CompleteRestaurant";
import { ProductManagementPage } from "@/components/templates/menu/ProductManagementPage";
import { getRestaurant } from "@/lib/queries/restaurantQueries";

export default async function Page() {
  const restaurant = await getRestaurant();

  return (
    <div className="p-4 lg:p-0">
      {restaurant?.isSetupComplete ? (
        <ProductManagementPage restaurantId={restaurant.id} />
      ) : (
        <CompleteRestaurant restaurant={restaurant} />
      )}
    </div>
  );
}
