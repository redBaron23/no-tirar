import { Restaurant } from "@prisma/client";
import dynamic from "next/dynamic";

const ClientMap = dynamic(() => import("@/components/organisms/ClientMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

interface Props {
  restaurants: Restaurant[];
}

const RestaurantsMap = ({ restaurants }: Props) => {
  return <ClientMap restaurants={restaurants} />;
};

export default RestaurantsMap;
