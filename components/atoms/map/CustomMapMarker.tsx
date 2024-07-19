import { MAP_ICON_COLORS, MAP_ICON_COMPONENTS } from "@/constants";
import { Restaurant } from "@prisma/client";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup } from "react-leaflet";

interface Props {
  restaurant: Restaurant;
}

const CustomMapMarker = ({ restaurant }: Props) => {
  const IconComponent = MAP_ICON_COMPONENTS[restaurant.type];
  const iconColor = MAP_ICON_COLORS[restaurant.type];

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
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
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
    <Marker
      position={[restaurant.latitude!, restaurant.longitude!]}
      icon={customIcon}
    >
      <Popup>{restaurant.name}</Popup>
    </Marker>
  );
};

export default CustomMapMarker;
