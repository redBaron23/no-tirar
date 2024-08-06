"use client";

import CustomMapMarker from "@/components/atoms/map/CustomMapMarker";
import UserLocationMarker from "@/components/atoms/map/UserLocationMarker";
import MapButton from "@/components/atoms/MapButton";
import { TAB_MENU_HEIGHT } from "@/constants/style";
import { useDimensions } from "@/hooks/useDimensions";
import { Restaurant } from "@prisma/client";
import { cx } from "class-variance-authority";
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
  const { browserSearchBarHeight } = useDimensions();

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

  const buttonsOffset = TAB_MENU_HEIGHT + browserSearchBarHeight;

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
      <div
        className={`absolute right-5 bottom-[${buttonsOffset}px] z-[1000] flex flex-col gap-2 md:bottom-5`}
      >
        <MapButton
          onClick={handleLocateMe}
          icon={Crosshair}
          label="Ubicarme"
          className={cx(isLocating && "animate-spin")}
          disabled={isLocating}
        />
        <MapButton onClick={handleFilter} icon={Filter} label="Filtrar Mapa" />
      </div>
    </>
  );
};

export default MapContent;
