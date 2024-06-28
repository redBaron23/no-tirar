import { CurvedChart } from "@/components/curved-chart";
import AverageRatingCard from "@/components/molecules/AverageRatingCard";
import DaySelect from "@/components/molecules/DaySelect";
import TopBar from "@/components/molecules/TopBar";
import ReviewsSection from "@/components/templates/ReviewsSection";
import { auth } from "@/lib/auth";
import { Serie } from "@nivo/line";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const data: Serie[] = [
  {
    id: "Desktop",
    data: [
      { x: "10 AM", y: 43 },
      { x: "12 PM", y: 61 },
      { x: "2 PM", y: 26 },
      { x: "4 PM", y: 90 },
      { x: "6 PM", y: 95 },
      { x: "8 PM", y: 110 },
      { x: "10 PM", y: 130 },
    ],
  },
];

const reviews = [
  {
    restaurantName: "Tony's Pizza",
    reviewText: "Excelente servicio! La comida tenía un sabor increíble.",
    rating: 5,
    dateTime: "2022-09-09T19:30:00Z",
  },
  {
    restaurantName: "Tony's Pizza",
    reviewText: "Buen servicio, pero la comida estaba un poco fría.",
    rating: 3,
    dateTime: "2022-09-10T20:00:00Z",
  },
  {
    restaurantName: "Tony's Pizza",
    reviewText: "El ambiente es muy acogedor y el café es delicioso.",
    rating: 4,
    dateTime: "2022-09-11T08:30:00Z",
  },
  {
    restaurantName: "Tony's Pizza",
    reviewText: "El mejor sushi de la ciudad, definitivamente volveré.",
    rating: 5,
    dateTime: "2022-09-12T18:45:00Z",
  },
  {
    restaurantName: "Tony's Pizza",
    reviewText: "Las hamburguesas son buenas, pero el servicio es lento.",
    rating: 3,
    dateTime: "2022-09-13T13:15:00Z",
  },
];

export default async function Page() {
  const session = await auth();

  return (
    <div className="pb-20 lg:pb-0">
      <TopBar isLoggedIn={!!session} role={session?.user.role} />
      <div className="container mx-auto max-w-screen-md p-4">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="pb-4 text-3xl font-semibold leading-tight text-gray-800">
              Hola, {session?.user.name}
            </h1>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Resumen
              </h2>
              <span className="flex cursor-pointer items-center text-gray-500 hover:underline">
                Más <FiChevronRight className="ml-1" />
              </span>
            </div>
            <DaySelect />
            <CurvedChart data={data} orders={25} sales={42000} />
          </div>
          <ReviewsSection reviews={reviews} />
        </section>
      </div>
    </div>
  );
}
