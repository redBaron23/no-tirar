import TopBar from "@/components/molecules/TopBar";
import RestaurantCardList from "../components/templates/RestaurantCardList";
import generateRestaurants from "../constants/mockData";
import { auth } from "@/lib/auth";

const restaurants = generateRestaurants(10);

export default async function Home() {
  const session = await auth();

  return (
    <>
      <TopBar isLoggedIn={!!session} />

      <RestaurantCardList restaurants={restaurants} />
    </>
  );
}
