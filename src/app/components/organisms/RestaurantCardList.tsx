import React from "react";
import RestaurantCard from "../molecules/RestaurantCard";

interface Restaurant {
  id: number;
  imageUrl: string;
  name: string;
  logo: string;
  bagName: string;
  rating: number;
  pickupTime: string;
  distance: number;
  price: number;
  originalPrice: number;
  itemsLeft: number;
}

interface RestaurantCardListProps {
  restaurants: Restaurant[];
}

const RestaurantCardList = ({ restaurants }: RestaurantCardListProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          imageUrl={restaurant.imageUrl}
          restaurantName={restaurant.name}
          restaurantLogo={restaurant.logo}
          bagName={restaurant.bagName}
          rating={restaurant.rating}
          pickupTime={restaurant.pickupTime}
          distance={restaurant.distance}
          price={restaurant.price}
          originalPrice={restaurant.originalPrice}
          itemsLeft={restaurant.itemsLeft}
        />
      ))}
    </section>
  );
};

export default RestaurantCardList;
