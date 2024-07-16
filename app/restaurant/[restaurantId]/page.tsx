import ExpandedRestaurantCard from "@/components/organisms/ExpandedRestaurantCard";
import { getRestaurantWithSurprise } from "@/lib/queries/restaurantQueries";

interface Props {
  params: { restaurantId: string };
}

export default async function Page({ params: { restaurantId } }: Props) {
  const restaurantWithSurprise = await getRestaurantWithSurprise(restaurantId);

  if (!restaurantWithSurprise) {
    return "No restaurant fund";
  }

  return (
    <main className="h-screen">
      <ExpandedRestaurantCard restaurant={restaurantWithSurprise} />
    </main>
  );
}
