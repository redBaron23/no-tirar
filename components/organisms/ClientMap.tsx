"use client";

import { POINTS } from "@/constants";
import { LatLng } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Crosshair, Filter } from "lucide-react";
import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import CustomMapMarker from "../atoms/map/CustomMapMarker";
import UserLocationMarker from "../atoms/map/UserLocationMarker";
import MapButton from "../atoms/MapButton";
import MapLegend from "../molecules/MapLegend";

const DEFAULT_ZOOM = 16;
const DEFAULT_LAT_LNG = new LatLng(-34.92145, -57.95453); // La Plata

const MapContent = () => {
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
      {POINTS.map((point) => (
        <CustomMapMarker key={point.id} point={point} />
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
      <MapLegend />
    </>
  );
};

interface Props {
  ipBasedLocation?: LatLng;
  zoom?: number;
}

const ClientMap = ({
  ipBasedLocation = DEFAULT_LAT_LNG,
  zoom = DEFAULT_ZOOM,
}: Props) => {
  return (
    <MapContainer
      center={ipBasedLocation}
      zoom={zoom}
      className="custom-map h-[calc(100vh-70px)] w-full lg:h-screen"
    >
      <MapContent />
    </MapContainer>
  );
};

export default ClientMap;
