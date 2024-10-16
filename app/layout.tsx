import { Providers } from "@/Providers";
import BottomTabMenu from "@/components/organisms/BottomTabMenu";
import Sidebar from "@/components/organisms/Sidebar";
import { APP_NAME } from "@/constants";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { inter, merriweather_sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${APP_NAME}: Rescata comida, ahorra dinero, salva el planeta`,
  description: `Únete a ${APP_NAME} y sé parte de la revolución contra el desperdicio de alimentos. Descubre ofertas increíbles en comida que de otro modo se desperdiciaría, ahorra dinero y ayuda al medio ambiente.`,
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
        className={`${inter.className} ${merriweather_sans.className} h-screen bg-gray-100 text-black dark:bg-stone-900 dark:text-white lg:flex`}
      >
        <Sidebar userRole={session?.user.role} />
        <Providers session={session}>{children}</Providers>
        <BottomTabMenu userRole={session?.user.role} />
      </body>
    </html>
  );
};

export default Layout;
