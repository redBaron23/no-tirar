import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Providers";
import { auth } from "@/lib/auth";
import { inter, merriweather_sans } from "./fonts";
import TabMenu from "@/components/molecules/TabMenu";

export const metadata: Metadata = {
  title: "No-tirar: Rescata comida, ahorra dinero, salva el planeta",
  description:
    "Únete a No-tirar y sé parte de la revolución contra el desperdicio de alimentos. Descubre ofertas increíbles en comida que de otro modo se desperdiciaría, ahorra dinero y ayuda al medio ambiente.",
};

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${merriweather_sans.className} bg-gray-100 text-black dark:bg-stone-900 dark:text-white`}
      >
        <Providers session={session}>
          <main className="h-[calc(100vh-70px)] lg:h-screen">{children}</main>
          <TabMenu userRole={session?.user.role} />
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
