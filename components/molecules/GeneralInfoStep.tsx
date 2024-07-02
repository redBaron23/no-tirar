"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImageIcon } from "lucide-react";
import GoogleAddressInput from "@/components/atoms/GoogleAddressInput";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";
import ImageInput from "../atoms/ImageInput";

const libraries: Libraries = ["places"];

const GeneralInfoStep = () => {
  const { isLoaded } = useLoadScript({
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
            <ImageInput type="profile" />
            <ImageInput type="background" />
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
