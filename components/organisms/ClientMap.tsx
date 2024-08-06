"use client";

import { Restaurant } from "@prisma/client";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import MapContent from "../molecules/map/MapContent";

const DEFAULT_ZOOM = 16;
const DEFAULT_LAT_LNG = new LatLng(-34.92145, -57.95453); // La Plata

interface Props {
  restaurants?: Restaurant[];
  ipBasedLocation?: LatLng;
  zoom?: number;
}

const ClientMap = ({
  restaurants,
  ipBasedLocation = DEFAULT_LAT_LNG,
  zoom = DEFAULT_ZOOM,
}: Props) => {
  return (
    <MapContainer
      center={ipBasedLocation}
      zoom={zoom}
      className={`custom-map h-[calc(100vh-80px)] w-full lg:h-screen`}
    >
      <MapContent restaurants={restaurants} />
    </MapContainer>
  );
};

export default ClientMap;
