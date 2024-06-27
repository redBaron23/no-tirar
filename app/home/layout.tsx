import TopBar from "@/components/molecules/TopBar";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  business: React.ReactNode;
  customer: React.ReactNode;
}>;

export default async function Layout({ business, customer, children }: Props) {
  const session = await auth();

  const isBusiness = session?.user.role === UserRole.BUSINESS;

  return (
    <div className="pb-20 lg:pb-0">
      <TopBar isLoggedIn={!!session} role={session?.user.role} />
      <section className="flex flex-col">
        {isBusiness ? business : customer}
        {children}
      </section>
    </div>
  );
}
