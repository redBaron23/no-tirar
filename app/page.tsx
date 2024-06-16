import SearchBar from "@/components/atoms/SearchBar";
import RestaurantCardList from "../components/templates/RestaurantCardList";
import generateRestaurants from "../constants/mockData";
import ThemeSwitch from "@/components/atoms/ThemeSwitch";

const restaurants = generateRestaurants(10);

export default function Home() {
  return (
    <div>
      <header className="flex items-center gap-2 p-4">
        <SearchBar />
        <ThemeSwitch />
      </header>
      <RestaurantCardList restaurants={restaurants} />
    </div>
  );
}
