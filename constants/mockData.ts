import { faker } from "@faker-js/faker";

function generateRestaurants(num: number) {
  const restaurantNames = [
    "Sushi Haven",
    "Burger Palace",
    "Pasta Fiesta",
    "Taco Town",
    "Pizza Paradise",
    "Curry Corner",
    "Salad Stop",
    "Bakery Bliss",
  ];
  const bagNames = [
    "Surprise Bag",
    "Mystery Meal",
    "Chef's Special",
    "Fiesta Pack",
    "Pizza Party",
    "Curry Delight",
    "Healthy Pack",
    "Sweet Treats",
  ];

  const restaurants = [];

  for (let i = 0; i < num; i++) {
    const id = i + 1;
    const name =
      restaurantNames[
        faker.number.int({ min: 0, max: restaurantNames.length - 1 })
      ];
    const bagName =
      bagNames[faker.number.int({ min: 0, max: bagNames.length - 1 })];
    const rating = parseFloat(
      faker.number.int({ min: 4, max: 5, precision: 0.1 }).toFixed(1)
    );
    const pickupTime = `${faker.number.int({
      min: 4,
      max: 7,
    })}:00 PM - ${faker.number.int({ min: 6, max: 9 })}:00 PM`;
    const distance = parseFloat(
      faker.datatype.float({ min: 1, max: 3, precision: 0.1 }).toFixed(1)
    );
    const price = parseFloat(
      faker.datatype.float({ min: 8, max: 15, precision: 0.01 }).toFixed(2)
    );
    const originalPrice = parseFloat(
      (
        price + faker.datatype.float({ min: 2, max: 4, precision: 0.01 })
      ).toFixed(2)
    );
    const itemsLeft = faker.number.int({ min: 1, max: 5 });

    restaurants.push({
      id,
      logo: faker.image.url(),
      name,
      imageUrl: faker.image.url(),
      bagName,
      rating,
      pickupTime,
      distance,
      price,
      originalPrice,
      itemsLeft,
    });
  }

  return restaurants;
}

export default generateRestaurants;
