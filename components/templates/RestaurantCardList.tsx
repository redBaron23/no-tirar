import React from "react";
import RestaurantCard from "../organisms/RestaurantCard";
import { RestaurantType } from "@/lib/validations/RestaurantValidation";

interface RestaurantCardListProps {
  restaurants: RestaurantType[];
}

const RestaurantCardList = ({ restaurants }: RestaurantCardListProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </section>
  );
};

export default RestaurantCardList;
