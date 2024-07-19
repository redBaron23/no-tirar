"use client";

import { useToast } from "@/components/ui/use-toast";
import { MAP_ICON_COLORS, MAP_ICON_COMPONENTS, PointType } from "@/constants";
import L, { Map } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Crosshair, Filter } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapButton from "../atoms/MapButton";
import MapLegend from "../molecules/MapLegend";

// Constants
const DEFAULT_ZOOM = 16;
const FALLBACK_ZOOM = 13;

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

interface CustomMarkerProps {
  point: Point;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ point }) => {
  const IconComponent = MAP_ICON_COMPONENTS[point.type];
  const iconColor = MAP_ICON_COLORS[point.type];

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

interface GeoData {
  lat: number;
  lng: number;
}

interface ClientMapProps {
  ipBasedLocation?: GeoData;
}

const ClientMap: React.FC<ClientMapProps> = ({ ipBasedLocation }) => {
  const mapRef = useRef<Map | null>(null);
  const [geoData, setGeoData] = useState<GeoData>(
    ipBasedLocation || {
      lat: POINTS[0].lat,
      lng: POINTS[0].lng,
    },
  );
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  const handleLocateMe = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeoData({ lat: latitude, lng: longitude });
          mapRef.current?.setView([latitude, longitude], DEFAULT_ZOOM, {
            animate: true,
            duration: 1,
          });
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          handleLocationError(error);
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // Increased timeout to 10 seconds
          maximumAge: 0,
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      handleLocationError(new Error("Geolocation not supported"));
      setIsLocating(false);
    }
  };

  const handleLocationError = (error: GeolocationPositionError | Error) => {
    let errorMessage = "Unable to get your location. ";

    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "You denied the request for geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage += "The request to get your location timed out.";
          break;
        default:
          errorMessage += "An unknown error occurred.";
      }
    } else {
      errorMessage += error.message;
    }

    toast({
      variant: "destructive",
      title: "Error",
      description: errorMessage,
    });

    if (ipBasedLocation) {
      setGeoData(ipBasedLocation);
      mapRef.current?.setView(
        [ipBasedLocation.lat, ipBasedLocation.lng],
        DEFAULT_ZOOM,
        {
          animate: true,
          duration: 1,
        },
      );
      toast({
        title: "Using IP-based location",
        description: "Using approximate location based on your IP address.",
      });
    } else {
      // Fallback to center of POINTS if IP-based location is not available
      const centerLat =
        POINTS.reduce((sum, point) => sum + point.lat, 0) / POINTS.length;
      const centerLng =
        POINTS.reduce((sum, point) => sum + point.lng, 0) / POINTS.length;
      setGeoData({ lat: centerLat, lng: centerLng });
      mapRef.current?.setView([centerLat, centerLng], FALLBACK_ZOOM, {
        animate: true,
        duration: 1,
      });
      toast({
        title: "Using default location",
        description: "Using default map center.",
      });
    }
  };

  const handleFilter = () => {
    // Implement filter functionality here
    console.log("Filter button clicked");
  };

  useEffect(() => {
    // Initial centering of the map
    handleLocateMe();
  }, [handleLocateMe]);

  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={DEFAULT_ZOOM}
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
      <MapButton
        onClick={handleLocateMe}
        icon={Crosshair}
        label="Locate Me"
        className={`absolute bottom-5 right-5 z-[1000] ${isLocating ? "animate-spin" : ""}`}
        disabled={isLocating}
      />
      <MapButton
        onClick={handleFilter}
        icon={Filter}
        label="Filter Map"
        className="absolute bottom-5 right-20 z-[1000]"
      />
      <MapLegend />
    </MapContainer>
  );
};

export default ClientMap;
