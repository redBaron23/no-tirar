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

const LoginButton = ({ children = "Ingresar", className }: Props) => {
  return (
    <Button
      onClick={() => signIn("google")}
      className={cx(
        "group relative inline-flex items-center overflow-hidden rounded-lg bg-green-500 px-5 py-2 text-white transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-teal-300",
        className,
      )}
    >
      <LogIn className="mr-2 h-4 w-4" />
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 h-full w-full scale-0 bg-blue-600 transition-transform duration-300 ease-in-out"></span>
    </Button>
  );
};

export default LoginButton;
