import TopBar from "@/components/molecules/TopBar";
import RestaurantCardList from "../../components/templates/RestaurantCardList";
import generateRestaurants from "../../constants/mockData";
import { auth } from "@/lib/auth";

const restaurants = generateRestaurants(10);

export default async function DiscoverPage() {
  const session = await auth();

  return (
    <div className="pb-20">
      <TopBar isLoggedIn={!!session} />

      <RestaurantCardList restaurants={restaurants} />
    </div>
  );
}
