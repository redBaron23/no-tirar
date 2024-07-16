import { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonLink = ({ icon, children, className, ...props }: Props) => {
  return (
    <Button
      className={`flex items-center rounded-lg p-3 ${className}`}
      {...props}
    >
      {icon}
      <span className="ml-3">{children}</span>
    </Button>
  );
};

export default ButtonLink;
