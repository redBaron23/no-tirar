"use client";

import * as React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { forwardRef } from "react";
import { Input as BaseInput, InputProps } from "../ui/input";

const GoogleAddressInput = () => {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyAhJWAOLkOLOori0EwDOdYu914h3o2F5CQ", // Reemplaza con tu clave de API
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });

  return <input></input>;
};

export default GoogleAddressInput;
