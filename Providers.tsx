"use client";

import { cx } from "class-variance-authority";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HIDDEN_PATHS } from "./constants";
import { pages } from "./constants/pages";

interface Props {
  session: Session | null;
  children: ReactNode;
}

export function Providers({ session, children }: Props) {
  const pathname = usePathname();

  const shouldHideTabMenu = HIDDEN_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === pages.index,
  );

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <main
        className={cx(
          !shouldHideTabMenu &&
            "h-[calc(100vh-70px)] overflow-y-auto px-4 lg:h-screen",
        )}
      >
        {children}
      </main>
    </SessionProvider>
  );
}
