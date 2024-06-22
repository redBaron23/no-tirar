import { auth } from "@/lib/auth";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  business: React.ReactNode;
  customer: React.ReactNode;
}>;

export default async function Layout({ business, customer, children }: Props) {
  const session = await auth();

  const isBusiness = false;

  return (
    <>
      {isBusiness ? business : customer}
      {children}
    </>
  );
}
