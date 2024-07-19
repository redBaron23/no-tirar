"use client";

import CustomMapMarker from "@/components/atoms/map/CustomMapMarker";
import UserLocationMarker from "@/components/atoms/map/UserLocationMarker";
import MapButton from "@/components/atoms/MapButton";
import { Restaurant } from "@prisma/client";
import { LatLng } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Crosshair, Filter } from "lucide-react";
import { useState } from "react";
import { TileLayer, useMapEvents } from "react-leaflet";

interface Props {
  restaurants?: Restaurant[];
}

const MapContent = ({ restaurants }: Props) => {
  const [position, setPosition] = useState<LatLng>();
  const [isLocating, setIsLocating] = useState(false);

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

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {restaurants &&
        restaurants.map((restaurant) => (
          <CustomMapMarker key={restaurant.id} restaurant={restaurant} />
        ))}
      {position && <UserLocationMarker position={position} />}
      <MapButton
        onClick={handleLocateMe}
        icon={Crosshair}
        label="Ubicarme"
        className={`absolute bottom-5 right-5 z-[1000] ${isLocating ? "animate-spin" : ""}`}
        disabled={isLocating}
      />
      <MapButton
        onClick={handleFilter}
        icon={Filter}
        label="Filtrar Mapa"
        className="absolute bottom-5 right-20 z-[1000]"
      />
    </>
  );
};

export default MapContent;
