"use client";

import { useToast } from "@/components/ui/use-toast";
import { useDimensions } from "@/hooks/useDimensions";
import { Share } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  restaurantName: string;
}

const ShareButton = ({ restaurantName }: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();
  const { isMobile } = useDimensions();

  const url = window.location.href;

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (isMobile && navigator.share) {
        await navigator.share({
          title: `¡Mirá esta oferta de ${restaurantName}!`,
          text: `Che, encontré una oferta buenísima en ${restaurantName}. ¡Fijate!`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "¡Link copiado al portapapeles!" });
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white disabled:opacity-50"
      aria-label="Compartir"
      onClick={handleShare}
      disabled={isSharing}
    >
      <Share className="h-5 w-5 text-gray-700" />
    </button>
  );
};

export default ShareButton;
