"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import GoogleAddressInput from "@/components/atoms/GoogleAddressInput";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";
import ImageInput from "../atoms/ImageInput";
import { cx } from "class-variance-authority";
import { Controller, Control } from "react-hook-form";

const libraries: Libraries = ["places"];

interface GeneralInfoForm {
  name: string;
  address: string;
  profileImage: File | null;
  backgroundImage: File | null;
}

interface Props {
  hide: boolean;
  control: Control<GeneralInfoForm>;
}

const GeneralInfoStep = ({ hide, control }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries,
  });

  return (
    <div
      className={cx(
        { hidden: hide },
        "my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600",
      )}
    >
      {isLoaded ? (
        <div className="grid w-full grid-cols-1 gap-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="name">
                Nombre del Establecimiento
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input id="name" placeholder="Ingresa el nombre" {...field} />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="address">
                Dirección
              </Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <GoogleAddressInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Controller
              name="profileImage"
              control={control}
              render={({ field }) => (
                <ImageInput
                  type="profile"
                  value={field.value}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                  }}
                />
              )}
            />
            <Controller
              name="backgroundImage"
              control={control}
              render={({ field }) => (
                <ImageInput
                  type="background"
                  value={field.value}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                  }}
                />
              )}
            />
          </div>
        </div>
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
