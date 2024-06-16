import { ReactNode } from "react";

interface Props {
  latitude: string;
  longitude: string;
  children: ReactNode;
}

const GoogleMapsLink = ({ latitude, longitude, children }: Props) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default GoogleMapsLink;
