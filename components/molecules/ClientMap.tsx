"use client";
import { Map } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Define a constant with some points
const POINTS = [
  { id: 1, name: "Plaza Moreno", lat: -34.9205, lng: -57.9536 },
  { id: 2, name: "Catedral de La Plata", lat: -34.9211, lng: -57.9544 },
  { id: 3, name: "Museo de La Plata", lat: -34.9098, lng: -57.9376 },
  { id: 4, name: "Estadio Ciudad de La Plata", lat: -34.9131, lng: -57.9894 },
  { id: 5, name: "Parque Saavedra", lat: -34.9119, lng: -57.9461 },
];

const ClientMap = () => {
  const mapRef = useRef<Map>(null);

  // Center the map on the average position of all points
  const centerLat =
    POINTS.reduce((sum, point) => sum + point.lat, 0) / POINTS.length;
  const centerLng =
    POINTS.reduce((sum, point) => sum + point.lng, 0) / POINTS.length;
  const [geoData, setGeoData] = useState({ lat: centerLat, lng: centerLng });

  useEffect(() => {
    const map = mapRef.current;

    return () => {
      if (map && map.remove) {
        map.remove();
      }
    };
  }, []);

  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={13}
      style={{ height: "90vh", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {POINTS.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ClientMap;
