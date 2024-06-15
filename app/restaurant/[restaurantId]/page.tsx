import ExpandedRestaurantCard from "@/components/molecules/ExpandedRestaurantCard";
import generateRestaurants from "@/constants/mockData";

interface Props {
  params: { restaurantId: string };
}

export default function Page({ params }: Props) {
  return (
    <main className="h-screen">
      <ExpandedRestaurantCard restaurant={generateRestaurants(1)[0]} />
    </main>
  );
}
