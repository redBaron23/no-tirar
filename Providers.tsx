"use client";

import { cx } from "class-variance-authority";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "./components/ui/toaster";
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
      <Toaster />
      <div
        className={cx(
          !shouldHideTabMenu &&
            "h-[calc(100vh-70px)] flex-1 overflow-y-auto lg:h-screen",
        )}
      >
        {children}
      </div>
    </SessionProvider>
  );
}
