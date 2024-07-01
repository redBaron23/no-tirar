import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImageIcon } from "lucide-react";
import GoogleAddressInput from "@/components/atoms/GoogleAddressInput";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";

const libraries: Libraries = ["places"];

const GeneralInfoStep = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries,
  });

  return (
    <div className="my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600">
      {isLoaded ? (
        <form className="grid w-full grid-cols-1 gap-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="name">
                Nombre del Establecimiento
              </Label>
              <Input id="name" placeholder="Ingresa el nombre" />
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="address">
                Dirección
              </Label>
              <GoogleAddressInput />
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
      ) : (
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-8 w-1/4 rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-1/4 rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
      )}
    </div>
  );
};

export default GeneralInfoStep;
