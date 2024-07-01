"use client";

import AutoComplete from "react-google-autocomplete";

const GoogleAddressInput = () => {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);
  return (
    <AutoComplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      onPlaceSelected={(place) => console.log(place)}
    />
  );
};

export default GoogleAddressInput;
