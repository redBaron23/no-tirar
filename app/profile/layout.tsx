import { auth } from "@/lib/auth";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
}>;

export default async function Layout({
  authenticated,
  unauthenticated,
  children,
}: Props) {
  const session = await auth();

  const isLoggedIn = !!session?.user?.name;

  return (
    <>
      {isLoggedIn ? authenticated : unauthenticated}
      {children}
    </>
  );
}
