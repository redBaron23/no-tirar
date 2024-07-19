import { MAP_ICON_COLORS, MAP_ICON_COMPONENTS, Point } from "@/constants";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup } from "react-leaflet";

interface Props {
  point: Point;
}

const CustomMapMarker = ({ point }: Props) => {
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
    <Marker position={[point.lat, point.lng]} icon={customIcon}>
      <Popup>{point.name}</Popup>
    </Marker>
  );
};

export default CustomMapMarker;
