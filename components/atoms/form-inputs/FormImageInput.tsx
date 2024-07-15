"use client";

import { compressImage } from "@/lib/utils";
import { ImageIcon, LayoutIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Control } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

const getImageData = async (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files || !event.target.files[0]) {
    return null;
  }

  const file = event.target.files[0];
  const compressedImage = await compressImage(file);

  if (!compressedImage) {
    return null;
  }

  const displayUrl = URL.createObjectURL(compressedImage);
  return { file: compressedImage, displayUrl };
};

interface Props {
  control: Control<any>;
  name: string;
  label: string;
  type: "profile" | "background";
  defaultUrl?: string | null;
}

const FormImageInput = ({ control, name, label, type, defaultUrl }: Props) => {
  const [preview, setPreview] = useState<string | null | undefined>(defaultUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <Avatar
                className={`cursor-pointer ${
                  type === "profile"
                    ? "h-12 w-12"
                    : "h-12 w-full rounded-md bg-muted transition-colors hover:bg-muted/80"
                }`}
                onClick={handleAvatarClick}
              >
                <AvatarImage src={preview || ""} className="object-cover" />
                <AvatarFallback>
                  {type === "profile" ? (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <LayoutIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </AvatarFallback>
              </Avatar>
              <input
                {...rest}
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={async (event) => {
                  const result = await getImageData(event);
                  if (result) {
                    const { file, displayUrl } = result;
                    setPreview(displayUrl);
                    onChange(file);
                  }
                }}
                accept="image/*"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormImageInput;
