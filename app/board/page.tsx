import { CurvedChart } from "@/components/curved-chart";
import DaySelect from "@/components/molecules/DaySelect";
import TopBar from "@/components/molecules/TopBar";
import { auth } from "@/lib/auth";
import { Serie } from "@nivo/line";
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

export default async function Page() {
  const session = await auth();

  return (
    <div className="pb-20 lg:pb-0">
      <TopBar isLoggedIn={!!session} role={session?.user.role} />
      <div className="container mx-auto max-w-screen-md p-4">
        <section className="flex flex-col gap-4">
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
        </section>
      </div>
    </div>
  );
}
