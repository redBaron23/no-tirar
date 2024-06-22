"use client";

import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { IoMdLogIn } from "react-icons/io";

interface Props {
  children?: ReactNode;
}

const LoginButton = ({ children = "Iniciar Sesion" }: Props) => {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center rounded-full bg-amber-500 px-6 py-2 text-white shadow-md transition-all duration-300 hover:bg-amber-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
    >
      <IoMdLogIn className="mr-2" />
      <span className="relative overflow-hidden">
        <span className="translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </button>
  );
};

export default LoginButton;
