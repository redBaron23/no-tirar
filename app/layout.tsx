import { Providers } from "@/Providers";
import TabMenu from "@/components/templates/TabMenu";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { inter, merriweather_sans } from "./fonts";
import "./globals.css";

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
          <TabMenu userRole={session?.user.role}>{children}</TabMenu>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
