import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input } from "../ui/input";

// This must be called in parent tree

// const { isLoaded, loadError } = useLoadScript({
//   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
//   libraries,
// });

const GoogleAddressInput = () => {
  const [address, setAddress] = useState<string>("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
      }
    }
  };

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autoC;
  };

  return (
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
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Autocomplete>
    </div>
  );
};

export default GoogleAddressInput;
