"use client";

import CustomMapMarker from "@/components/atoms/map/CustomMapMarker";
import UserLocationMarker from "@/components/atoms/map/UserLocationMarker";
import MapButton from "@/components/atoms/MapButton";
import { Restaurant } from "@prisma/client";
import { cx } from "class-variance-authority";
import { LatLng } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Crosshair } from "lucide-react";
import { useState } from "react";
import { TileLayer, useMapEvents } from "react-leaflet";
import RestaurantInfoCard from "./RestaurantInfoCard";

interface Props {
  restaurants?: Restaurant[];
}

const MapContent = ({ restaurants }: Props) => {
  const [position, setPosition] = useState<LatLng>();
  const [isLocating, setIsLocating] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    restaurants?.at(0),
  );

  const map = useMapEvents({
    locationerror(e) {
      setIsLocating(false);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      setIsLocating(false);
    },
  });

  const handleLocateMe = () => {
    setIsLocating(true);
    map.locate();
  };

  const handleFilter = () => {
    console.log("Botón de filtro clickeado");
  };

  // Calculate distance between two points
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {restaurants &&
        restaurants.map((restaurant) => (
          <CustomMapMarker
            key={restaurant.id}
            restaurant={restaurant}
            onClick={setSelectedRestaurant}
          />
        ))}
      {position && <UserLocationMarker position={position} />}
      <div className="absolute inset-x-0 bottom-5 z-[1000] grid grid-rows-[auto_1fr] gap-4 p-4">
        {/* className={`absolute bottom-5 right-5 z-[1000] flex flex-col justify-end gap-2 pb-[80px] md:pb-0`} */}

        <div className="flex justify-end gap-2">
          <MapButton
            onClick={handleLocateMe}
            icon={Crosshair}
            label="Ubicarme"
            className={cx(isLocating && "animate-spin")}
            disabled={isLocating}
          />
          {/* <MapButton onClick={handleFilter} icon={Filter} label="Filtrar Mapa" /> */}
        </div>
        {selectedRestaurant && (
          <div className="flex w-full justify-center">
            <RestaurantInfoCard
              restaurant={selectedRestaurant}
              distance={500}
              // distance={calculateDistance(
              //   position.lat,
              //   position.lng,
              //   selectedRestaurant.latitude,
              //   selectedRestaurant.longitude
              // )}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MapContent;
