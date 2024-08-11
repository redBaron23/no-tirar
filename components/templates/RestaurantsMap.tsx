import { Restaurant } from "@prisma/client";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const ClientMap = dynamic(() => import("@/components/organisms/ClientMap"), {
  loading: () => (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-teal-500">
      <Skeleton className="absolute inset-0 h-full w-full animate-pulse bg-white/10" />
      <span className="animate-pulse text-2xl font-bold text-white">
        Cargando...
      </span>
    </div>
  ),
  ssr: false,
});

interface Props {
  restaurants: Restaurant[];
}

const RestaurantsMap = ({ restaurants }: Props) => {
  return <ClientMap restaurants={restaurants} />;
};

export default RestaurantsMap;
