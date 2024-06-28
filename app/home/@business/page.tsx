import DaySelect from "@/components/molecules/DaySelect";
import OrdersSection from "@/components/templates/OrdersSection";
import ReviewsSection from "@/components/templates/ReviewsSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const reviews = [
  {
    name: "Danielle Austin",
    rating: "5 stars",
    review:
      "Commercial remain film sport value can week. The system always theory month edge remain.",
  },
  {
    name: "Heather Aguilar",
    rating: "4 stars",
    review:
      "Bring those organization may total media after. Generation short scene media follow these community.",
  },
  {
    name: "Antonio Webb",
    rating: "1 star",
    review:
      "Friend may business late suggest almost. Could everyone season glass.",
  },
  {
    name: "Earl Moon",
    rating: "2 stars",
    review:
      "Drug stay treatment occur meet. Wonder religion short option another set.",
  },
  {
    name: "Thomas Cummings",
    rating: "4 stars",
    review:
      "Manager best body leg interest investment industry. Explain leader hit find system.",
  },
  {
    name: "Jamie Anderson",
    rating: "3 stars",
    review:
      "Teach natural push finish. Early support performance indeed environment turn.",
  },
  {
    name: "Michelle Davidson",
    rating: "4 stars",
    review:
      "Offer treat system fight education mouth baby. Everyone teacher able air.",
  },
  {
    name: "Samuel Smith",
    rating: "5 stars",
    review:
      "Ahead strategy glass style church suggest. Support thought candidate detail theory.",
  },
  {
    name: "Leon Clark",
    rating: "2 stars",
    review: "A out partner century. Discussion hit image manage social.",
  },
  {
    name: "Nicholas Young",
    rating: "2 stars",
    review: "Bed chair beautiful point start sea. Age something usually girl.",
  },
];

export default function Page() {
  return (
    <div className="container mx-auto flex w-full max-w-screen-md flex-col gap-8 p-4">
      <h1 className="text-3xl font-semibold leading-tight text-gray-800">
        Historial de Pedidos
      </h1>
      <DaySelect />
      <OrdersSection />
      {/* <ReviewsSection reviews={reviews} /> */}
    </div>
  );
}
