"use client";

import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { Input } from "../ui/input";

interface GoogleAddressInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const GoogleAddressInput = ({ value, onChange }: GoogleAddressInputProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: -34.6037,
    lng: -58.3816,
  }); // Default to Buenos Aires
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [apartmentNumber, setApartmentNumber] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(false);

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
          // Reverse geocode to get address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat: latitude, lng: longitude } });
          setShowMap(true);
        },
        () => {
          console.log("Unable to retrieve your location");
        },
      );
    }
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
      }
      if (place.formatted_address) {
        onChange(place.formatted_address);
      }
      setShowMap(true);
    }
  };

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autoC;
  };

  const handleApartmentNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setApartmentNumber(e.target.value);
  };

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            componentRestrictions: { country: "AR" }, // Restrict results to Argentina
          }}
        >
          <Input
            type="text"
            placeholder="Direccion o punto de referencia"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </Autocomplete>
      </div>

      {showMap && (
        <Input
          type="text"
          placeholder="Apartment number (optional)"
          value={apartmentNumber}
          onChange={handleApartmentNumberChange}
        />
      )}

      {!showMap && (
        <Button onClick={useCurrentLocation}>Usar ubicación actual</Button>
      )}

      {showMap && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "300px" }}
          center={mapCenter}
          zoom={15}
          options={mapOptions}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleAddressInput;
