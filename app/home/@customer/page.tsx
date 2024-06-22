import TopBar from "@/components/molecules/TopBar";
import RestaurantCardList from "@/components/templates/RestaurantCardList";
import generateRestaurants from "@/constants/mockData";
import { auth } from "@/lib/auth";

const restaurants = generateRestaurants(15);

export default async function Page() {
  const session = await auth();

  return (
    <div className="pb-20 lg:pb-0">
      <TopBar isLoggedIn={!!session} />

      <RestaurantCardList restaurants={restaurants} />
    </div>
  );
}
