"use client";
import L, { Map } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Cake, Coffee, LucideIcon, UtensilsCrossed } from "lucide-react";
import React, { useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type PointType = "cafe" | "restaurant" | "bakery";

interface Point {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: PointType;
}

const POINTS: Point[] = [
  { id: 1, name: "Plaza Moreno", lat: -34.9205, lng: -57.9536, type: "cafe" },
  {
    id: 2,
    name: "Catedral de La Plata",
    lat: -34.9211,
    lng: -57.9544,
    type: "restaurant",
  },
  {
    id: 3,
    name: "Museo de La Plata",
    lat: -34.9098,
    lng: -57.9376,
    type: "bakery",
  },
  {
    id: 4,
    name: "Estadio Ciudad de La Plata",
    lat: -34.9131,
    lng: -57.9894,
    type: "cafe",
  },
  {
    id: 5,
    name: "Parque Saavedra",
    lat: -34.9119,
    lng: -57.9461,
    type: "restaurant",
  },
];

const iconComponents: Record<PointType, LucideIcon> = {
  cafe: Coffee,
  restaurant: UtensilsCrossed,
  bakery: Cake,
};

const iconColors: Record<PointType, string> = {
  cafe: "#4A90E2",
  restaurant: "#50E3C2",
  bakery: "#F5A623",
};

interface CustomMarkerProps {
  point: Point;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ point }) => {
  const IconComponent = iconComponents[point.type];
  const iconColor = iconColors[point.type];

  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <div
        style={{
          backgroundColor: iconColor,
          borderRadius: "50%",
          padding: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        <IconComponent size={20} color="#FFFFFF" />
      </div>,
    ),
    className: "custom-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Marker position={[point.lat, point.lng]} icon={customIcon}>
      <Popup>{point.name}</Popup>
    </Marker>
  );
};

interface CenterMapButtonProps {
  center: [number, number];
}

const CenterMapButton: React.FC<CenterMapButtonProps> = ({ center }) => {
  const map = useMap();

  const handleCenterMap = () => {
    map.setView(center, 13);
  };

  return (
    <button
      onClick={handleCenterMap}
      className="absolute bottom-5 right-5 z-[1000] rounded-md border-2 border-gray-300 bg-white px-4 py-2 shadow-md transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Center Map
    </button>
  );
};

const MapLegend: React.FC = () => {
  return (
    <div className="absolute right-5 top-5 z-[1000] rounded-md bg-white p-4 shadow-md">
      <h3 className="mb-2 font-bold">Legend</h3>
      {Object.entries(iconComponents).map(([type, IconComponent]) => (
        <div key={type} className="mb-2 flex items-center">
          <div
            style={{
              backgroundColor: iconColors[type as PointType],
              borderRadius: "50%",
              padding: "4px",
              marginRight: "8px",
            }}
          >
            <IconComponent size={16} color="#FFFFFF" />
          </div>
          <span className="capitalize">{type}</span>
        </div>
      ))}
    </div>
  );
};

interface GeoData {
  lat: number;
  lng: number;
}

const ClientMap: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const centerLat =
    POINTS.reduce((sum, point) => sum + point.lat, 0) / POINTS.length;
  const centerLng =
    POINTS.reduce((sum, point) => sum + point.lng, 0) / POINTS.length;
  const [geoData, setGeoData] = useState<GeoData>({
    lat: centerLat,
    lng: centerLng,
  });

  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={13}
      className="h-[90vh] w-full"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {POINTS.map((point) => (
        <CustomMarker key={point.id} point={point} />
      ))}
      <CenterMapButton center={[geoData.lat, geoData.lng]} />
      <MapLegend />
    </MapContainer>
  );
};

export default ClientMap;
