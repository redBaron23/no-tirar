"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="w-full rounded-full border border-red-700 bg-transparent px-4 py-2 font-semibold text-red-700 hover:border-transparent hover:bg-red-500 hover:text-white"
    >
      Salir
    </Button>
  );
};

export default LogoutButton;
