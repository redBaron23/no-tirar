import { Button, ButtonProps } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props extends ButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}

const MapButton = ({ onClick, icon: Icon, label, className }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      size="icon"
      className={`rounded-full bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 ${className}`}
      aria-label={label}
    >
      <Icon size={23} />
    </Button>
  );
};

export default MapButton;
