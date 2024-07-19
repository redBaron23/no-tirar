import { MAP_ICON_COLORS, MAP_ICON_COMPONENTS, PointType } from "@/constants";

const MapLegend = () => {
  return (
    <div className="absolute right-5 top-5 z-[1000] rounded-md bg-white p-4 shadow-md">
      <h3 className="mb-2 font-bold">Legend</h3>
      {Object.entries(MAP_ICON_COMPONENTS).map(([type, IconComponent]) => (
        <div key={type} className="mb-2 flex items-center">
          <div
            style={{
              backgroundColor: MAP_ICON_COLORS[type as PointType],
              borderRadius: "50%",
              padding: "4px",
              marginRight: "8px",
            }}
          >
            <IconComponent size={16} color="#FFFFFF" />
          </div>
          <span className="capitalize">{type}</span>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;
