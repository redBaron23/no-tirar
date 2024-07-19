import { MAP_ICON_COLORS, MAP_ICON_COMPONENTS, PointType } from "@/constants";

const MapLegend = () => {
  const typeTranslations: Record<PointType, string> = {
    cafe: "Café",
    restaurant: "Restaurante",
    bakery: "Panadería",
    // Add other types as needed
  };

  return (
    <div className="absolute right-5 top-5 z-[1000] rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <h3 className="mb-3 text-lg font-bold text-gray-800">Tipos de Locales</h3>
      <div className="space-y-2">
        {Object.entries(MAP_ICON_COMPONENTS).map(([type, IconComponent]) => (
          <div
            key={type}
            className="group flex items-center rounded-md p-2 transition-all duration-300 hover:bg-gray-100"
          >
            <div
              className="mr-3 flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{
                backgroundColor: MAP_ICON_COLORS[type as PointType],
              }}
            >
              <IconComponent size={18} color="#FFFFFF" />
            </div>
            <span className="text-gray-700 group-hover:font-medium">
              {typeTranslations[type as PointType] || type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
