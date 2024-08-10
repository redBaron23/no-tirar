"use client";

import { cx } from "class-variance-authority";
import { Heart } from "lucide-react";

interface Props {
  isFavorite: boolean;
}

const FavoriteButton = ({ isFavorite }: Props) => {
  return (
    <button
      className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
      aria-label="Favorito"
    >
      <Heart
        className={cx(`h-5 w-5 text-red-500`, isFavorite && "fill-red-500")}
      />
    </button>
  );
};

export default FavoriteButton;
