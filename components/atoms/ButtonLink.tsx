import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cx } from "class-variance-authority";

interface Props {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonLink = ({ children, onClick, icon, className }: Props) => {
  return (
    <Button
      variant="link"
      onClick={onClick}
      className={cx(
        "m-0 flex items-center justify-start gap-2 p-0 text-sm md:text-base",
        className,
      )}
    >
      {icon}
      {children}
    </Button>
  );
};

export default ButtonLink;
