import { CurvedChart } from "@/components/curved-chart";
import DaySelect from "@/components/molecules/DaySelect";
import TopBar from "@/components/molecules/TopBar";
import { auth } from "@/lib/auth";
import { LineChart } from "lucide-react";
import { FiChevronRight } from "react-icons/fi";

export default async function Page() {
  const session = await auth();

  return (
    <div className="pb-20 lg:pb-0">
      <TopBar isLoggedIn={!!session} role={session?.user.role} />
      <section className="flex w-full flex-col gap-4 p-4">
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
        {/* <LineChart /> */}
        <CurvedChart />
      </section>
    </div>
  );
}
