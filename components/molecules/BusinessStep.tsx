import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MapPinIcon, ImageIcon } from "lucide-react";

const BusinessStep = () => {
  return (
    <div className="bg-secondary my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border p-4 text-gray-600">
      <form className="grid w-full grid-cols-1 gap-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="name">
              Nombre del Restaurante
            </Label>
            <Input
              id="name"
              placeholder="Ingresa el nombre de tu restaurante"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="address">
              Dirección
            </Label>
            <div className="relative">
              <MapPinIcon className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                id="address"
                placeholder="Ingresa la dirección de tu restaurante"
                className="pl-8"
              />
            </div>
            <div className="text-muted-foreground text-sm">
              Haz clic en el ícono del mapa para seleccionar tu ubicación.
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="profile-photo">
              Foto de Perfil
            </Label>
            <label htmlFor="profile-upload" className="cursor-pointer">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <ImageIcon className="h-8 w-8 text-gray-500" />
              </div>
              <input id="profile-upload" type="file" className="hidden" />
            </label>
          </div>
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="background-photo">
              Foto de Fondo
            </Label>
            <label
              htmlFor="background-upload"
              className="w-full cursor-pointer"
            >
              <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-md bg-gray-200">
                <ImageIcon className="h-8 w-8 text-gray-500" />
              </div>
              <input id="background-upload" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusinessStep;
