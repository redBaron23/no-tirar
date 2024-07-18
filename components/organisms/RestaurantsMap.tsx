import dynamic from "next/dynamic";

// Define a constant with some points
const POINTS = [
  { id: 1, name: "Restaurant A", lat: 40.7128, lng: -74.006 },
  { id: 2, name: "Cafe B", lat: 40.7282, lng: -73.9942 },
  { id: 3, name: "Bistro C", lat: 40.7484, lng: -73.9857 },
  { id: 4, name: "Diner D", lat: 40.7589, lng: -73.9851 },
];

const RestaurantsMap = () => {
  const ClientMap = dynamic(() => import("@/components/molecules/ClientMap"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return <ClientMap />;
};

export default RestaurantsMap;
