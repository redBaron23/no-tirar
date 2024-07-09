import CompleteRestaurant from "@/components/templates/CompleteRestaurant";
import { ProductEditor } from "@/components/templates/menu/ProductEditor";
import { getRestaurant } from "@/lib/queries/restaurantQueries";

export default async function Page() {
  const restaurant = await getRestaurant();

  console.log({ restaurant });

  if (restaurant?.isSetupComplete) {
    return <ProductEditor />;
  }

  return (
    <div className="p-5">
      <CompleteRestaurant restaurant={restaurant} />
    </div>
  );
}
