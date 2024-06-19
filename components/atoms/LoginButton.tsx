"use client";

import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-block transform rounded-full bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
    >
      Get Started
    </button>
  );
};

export default LoginButton;
