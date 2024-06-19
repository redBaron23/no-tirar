"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface Props {
  session: Session | null;
  children: ReactNode;
}

export function Providers({ session, children }: Props) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
}
