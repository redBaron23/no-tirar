"use client";

import { toggleFavoriteRestaurant } from "@/app/actions/favoriteRestaurant/toggleFavoriteRestaurant";
import { cx } from "class-variance-authority";
import { Heart } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";

interface Props {
  isFavorite: boolean;
  restaurantId: string;
}

const FavoriteButton = ({
  isFavorite: initialIsFavorite,
  restaurantId,
}: Props) => {
  const { execute, optimisticState, isExecuting, result, status } =
    useOptimisticAction(toggleFavoriteRestaurant, {
      currentState: { isFavorite: initialIsFavorite },
      updateFn: (state) => ({
        isFavorite: state.isFavorite,
      }),
    });

  const handleToggleFavorite = () => {
    execute({ restaurantId });
  };

  const currentIsFavorite =
    result?.data?.isFavorite || optimisticState.isFavorite;

  return (
    <button
      className={cx(
        "rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white",
        isExecuting && "cursor-not-allowed opacity-50",
      )}
      aria-label="Favorito"
      onClick={handleToggleFavorite}
      disabled={isExecuting}
    >
      <Heart
        className={cx(
          `h-5 w-5 text-red-500`,
          currentIsFavorite && "fill-red-500",
        )}
      />
    </button>
  );
};

export default FavoriteButton;
