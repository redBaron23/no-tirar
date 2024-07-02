"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Label } from "../ui/label";

interface ImageInputProps {
  type: "profile" | "background";
  value: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ type, value, onChange }: ImageInputProps) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    // Call the onChange prop to update the form state
    onChange(e);
  };

  return (
    <div className="grid gap-2">
      <Label className="text-gray-700" htmlFor={`${type}-photo`}>
        {type === "profile" ? "Imagen de Perfil" : "Imagen de Fondo"}
      </Label>
      <label
        htmlFor={`${type}-upload`}
        className={`${
          type === "profile"
            ? "h-16 w-16 rounded-full"
            : "h-16 w-full rounded-md"
        } cursor-pointer`}
      >
        <div
          className={`relative flex items-center justify-center overflow-hidden bg-gray-200 ${
            type === "profile"
              ? "h-16 w-16 rounded-full"
              : "h-16 w-full rounded-md"
          }`}
        >
          {image ? (
            <Image
              src={image}
              alt={`${type} preview`}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-gray-500" />
          )}
        </div>
        <input
          id={`${type}-upload`}
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageInput;
