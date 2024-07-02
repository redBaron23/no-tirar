import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Label } from "../ui/label";

interface ImageInputProps {
  type: "profile" | "background";
}

const ImageInput = ({ type }: ImageInputProps) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="grid gap-2">
      <Label className="text-gray-700" htmlFor={`${type}-photo`}>
        {type === "profile" ? "Foto de Perfil" : "Foto de Fondo"}
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
            <img src={image} alt={`${type} preview`} className="object-cover" />
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
