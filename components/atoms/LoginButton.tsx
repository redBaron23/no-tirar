"use client";

import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { CiLogin } from "react-icons/ci";
import { Button } from "../ui/button";
import ButtonLink from "./ButtonLink";

interface Props {
  children?: ReactNode;
}

const LoginButton = ({ children = "Iniciar Sesion" }: Props) => {
  return (
    <Button
      onClick={() => signIn("google")}
      className="flex w-44 items-center justify-center rounded-full bg-amber-500 px-3 py-2 text-white shadow-md transition-all duration-300 hover:bg-amber-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
    >
      <CiLogin className="mr-2" />
      <span className="relative overflow-hidden">
        <span className="translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </Button>
  );
};

export const LoginLink = () => {
  return (
    <ButtonLink icon={<CiLogin />} onClick={() => signIn("google")}>
      Iniciar sesion
    </ButtonLink>
  );
};

export default LoginButton;
