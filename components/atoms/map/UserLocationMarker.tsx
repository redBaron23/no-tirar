import L, { LatLng } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";

interface Props {
  position: LatLng;
}

const UserLocationMarker = ({ position }: Props) => {
  const userIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <div className="relative">
        <div className="absolute -inset-2 animate-ping rounded-full bg-green-500 opacity-30"></div>
        <div className="relative h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-lg"></div>
      </div>,
    ),
    className: "user-location-icon",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return <Marker position={position} icon={userIcon}></Marker>;
};

export default UserLocationMarker;
