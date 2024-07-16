"use client";

import { cx } from "class-variance-authority";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  children?: ReactNode;
  className?: string;
}

const LoginButton = ({ children = "Iniciar Sesión", className }: Props) => {
  return (
    <Button
      onClick={() => signIn("google")}
      className={cx(
        "group relative inline-flex items-center overflow-hidden rounded-full bg-amber-500 px-6 py-2 text-white shadow-md transition-all duration-300 hover:bg-amber-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300",
        className,
      )}
    >
      <LogIn className="mr-2 h-5 w-5" />
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-100"></span>
    </Button>
  );
};

export default LoginButton;
